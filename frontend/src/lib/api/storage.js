import { supabase } from "../supabaseClient.js";

// All product/media images live in this single public bucket.
// See supabase/schema.sql for the bucket + storage policy setup.
export const MEDIA_BUCKET = "media";

const randomId = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36));

const sanitizeFileName = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-");

/**
 * Upload one or more image files to Supabase Storage.
 * Returns an array of { url, path, alt } objects — shaped to be a
 * drop-in replacement for the old Cloudinary { url, publicId } objects.
 */
export const uploadImages = async (files, { folder = "products", alt = "" } = {}) => {
  const list = Array.from(files);
  const uploaded = [];

  for (const file of list) {
    const path = `${folder}/${randomId()}-${sanitizeFileName(file.name)}`;
    const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

    if (error) throw error;

    const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
    uploaded.push({ url: data.publicUrl, path, alt });
  }

  return uploaded;
};

/**
 * List all images in the bucket (used by the admin Media Library page).
 * Walks every top-level folder since Supabase Storage `list()` is not recursive.
 */
export const listMedia = async () => {
  const { data: topLevel, error: topError } = await supabase.storage.from(MEDIA_BUCKET).list("", {
    limit: 1000,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (topError) throw topError;

  const folders = (topLevel || []).filter((entry) => entry.id === null);
  const rootFiles = (topLevel || []).filter((entry) => entry.id !== null);

  const nested = await Promise.all(
    folders.map(async (folder) => {
      const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list(folder.name, {
        limit: 1000,
        sortBy: { column: "created_at", order: "desc" },
      });
      if (error) return [];
      return (data || []).map((entry) => ({ ...entry, path: `${folder.name}/${entry.name}` }));
    })
  );

  const allFiles = [
    ...rootFiles.map((entry) => ({ ...entry, path: entry.name })),
    ...nested.flat(),
  ];

  return allFiles
    .filter((entry) => entry.id !== null)
    .map((entry) => {
      const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(entry.path);
      return {
        path: entry.path,
        url: data.publicUrl,
        createdAt: entry.created_at,
        size: entry.metadata?.size,
      };
    });
};

export const deleteMedia = async (path) => {
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);
  if (error) throw error;
};

export const getPublicUrl = (path) => supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
