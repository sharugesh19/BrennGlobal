import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";
import { listMedia, uploadImages, deleteMedia } from "../../lib/api/storage.js";
import { SkeletonBlock } from "../../components/ui/Skeleton.jsx";

const Media = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = () => {
    setLoading(true);
    listMedia()
      .then(setAssets)
      .catch(() => setAssets([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      await uploadImages(files, { folder: "media" });
      toast.success("Uploaded");
      load();
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (path) => {
    if (!window.confirm("Delete this image? It may still be referenced by a product.")) return;
    try {
      await deleteMedia(path);
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="mt-1 text-sm text-slate">Images stored in Supabase Storage.</p>
        </div>
        <label className="btn-primary cursor-pointer !py-2.5 !px-5 text-sm">
          <HiOutlineUpload /> {uploading ? "Uploading…" : "Upload"}
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonBlock key={i} className="aspect-square" />)
        ) : assets.length === 0 ? (
          <p className="col-span-full py-12 text-center text-sm text-slate">No media uploaded yet.</p>
        ) : (
          assets.map((asset) => (
            <div key={asset.path} className="group relative aspect-square overflow-hidden rounded-xl border border-ink/8">
              <img src={asset.url} alt="" className="h-full w-full object-cover" />
              <button
                onClick={() => handleDelete(asset.path)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <HiOutlineTrash size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Media;
