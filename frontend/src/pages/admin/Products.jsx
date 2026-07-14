import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { listProducts, updateProductStatus, deleteProduct } from "../../lib/api/products.js";
import { SkeletonBlock } from "../../components/ui/Skeleton.jsx";

const STATUS_STYLES = {
  published: "bg-green-100 text-green-700",
  draft: "bg-gray-100 text-gray-600",
  "coming-soon": "bg-brenn-yellow/20 text-brenn-yellow-dark",
  hidden: "bg-red-100 text-red-600",
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    listProducts({ all: true })
      .then(setProducts)
      .catch((err) => toast.error(err.message || "Failed to load products"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateProductStatus(id, status);
      toast.success("Status updated");
      load();
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      load();
    } catch (err) {
      toast.error(err.message || "Failed to delete product");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="mt-1 text-sm text-slate">Add, edit, and control visibility of your catalog.</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary !py-2.5 !px-5 text-sm">
          <HiOutlinePlus /> Add Product
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl2 border border-ink/8 bg-white">
        {loading ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-16" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate">No products yet. Add your first one.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/8 bg-cloud/60 text-xs uppercase tracking-wider text-slate">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/8">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images?.[0]?.url}
                        alt=""
                        className="h-10 w-10 rounded-lg object-cover bg-cloud"
                      />
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-xs text-slate">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={p.status}
                      onChange={(e) => handleStatusChange(p.id, e.target.value)}
                      className={`rounded-full border-none px-3 py-1 text-xs font-medium capitalize outline-none ${STATUS_STYLES[p.status]}`}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="coming-soon">Coming Soon</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">{p.isFeatured ? "Yes" : "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/products/${p.id}/edit`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/10 text-slate hover:border-ink hover:text-ink"
                      >
                        <HiOutlinePencil />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/10 text-slate hover:border-red-500 hover:text-red-500"
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
