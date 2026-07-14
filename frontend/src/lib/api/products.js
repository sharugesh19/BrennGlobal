import { supabase } from "../supabaseClient.js";

const TABLE = "products";

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Map a DB row (snake_case) to the shape the UI expects (camelCase),
// matching the original Mongoose Product model field names so components
// barely had to change.
const rowToProduct = (row) => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  tagline: row.tagline || "",
  description: row.description || "",
  category: row.category || "Kitchen Tools",
  features: row.features || [],
  applications: row.applications || [],
  specifications: row.specifications || [],
  images: row.images || [],
  amazonUrl: row.amazon_url || "",
  price: row.price,
  currency: row.currency || "INR",
  status: row.status || "draft",
  isFeatured: row.is_featured || false,
  sortOrder: row.sort_order || 0,
  seo: row.seo || { metaTitle: "", metaDescription: "", keywords: [] },
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Map the UI's camelCase product object back to DB column names.
const productToRow = (product) => {
  const row = {};
  if (product.title !== undefined) row.title = product.title;
  if (product.slug !== undefined) row.slug = product.slug;
  if (product.tagline !== undefined) row.tagline = product.tagline;
  if (product.description !== undefined) row.description = product.description;
  if (product.category !== undefined) row.category = product.category;
  if (product.features !== undefined) row.features = product.features;
  if (product.applications !== undefined) row.applications = product.applications;
  if (product.specifications !== undefined) row.specifications = product.specifications;
  if (product.images !== undefined) row.images = product.images;
  if (product.amazonUrl !== undefined) row.amazon_url = product.amazonUrl;
  if (product.price !== undefined) row.price = product.price === "" ? null : product.price;
  if (product.currency !== undefined) row.currency = product.currency;
  if (product.status !== undefined) row.status = product.status;
  if (product.isFeatured !== undefined) row.is_featured = product.isFeatured;
  if (product.sortOrder !== undefined) row.sort_order = product.sortOrder;
  if (product.seo !== undefined) row.seo = product.seo;
  return row;
};

/**
 * Fetch products.
 * - Public callers (opts.all is falsy) only ever get published / coming-soon items.
 * - Admin callers pass { all: true } to get every product regardless of status
 *   (RLS still enforces that only an authenticated admin can do this).
 */
export const listProducts = async ({ all = false } = {}) => {
  let query = supabase.from(TABLE).select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });

  if (!all) {
    query = query.in("status", ["published", "coming-soon"]);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(rowToProduct);
};

export const getProductBySlug = async (slug) => {
  const { data, error } = await supabase.from(TABLE).select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return rowToProduct(data);
};

export const getProductById = async (id) => {
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return rowToProduct(data);
};

export const createProduct = async (product) => {
  const row = productToRow(product);
  if (!row.slug && row.title) {
    row.slug = slugify(row.title);
  }
  const { data, error } = await supabase.from(TABLE).insert(row).select().single();
  if (error) throw error;
  return rowToProduct(data);
};

export const updateProduct = async (id, product) => {
  const row = productToRow(product);
  if (product.title && !product.slug) {
    row.slug = slugify(product.title);
  }
  const { data, error } = await supabase.from(TABLE).update(row).eq("id", id).select().single();
  if (error) throw error;
  return rowToProduct(data);
};

export const deleteProduct = async (id) => {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
};

export const updateProductStatus = async (id, status) => {
  const { data, error } = await supabase.from(TABLE).update({ status }).eq("id", id).select().single();
  if (error) throw error;
  return rowToProduct(data);
};
