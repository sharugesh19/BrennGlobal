import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineX } from "react-icons/hi";
import { getProductById, createProduct, updateProduct } from "../../lib/api/products.js";
import { uploadImages } from "../../lib/api/storage.js";

const emptyProduct = {
  title: "",
  tagline: "",
  description: "",
  category: "Kitchen Tools",
  amazonUrl: "",
  price: "",
  currency: "INR",
  status: "draft",
  isFeatured: false,
  features: [""],
  applications: [""],
  specifications: [{ label: "", value: "" }],
  images: [],
  seo: { metaTitle: "", metaDescription: "", keywords: [] },
};

const inputClass = "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm outline-none focus:border-brenn-yellow";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate";

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [product, setProduct] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    getProductById(id).then((found) => {
      if (found) {
        setProduct({
          ...emptyProduct,
          ...found,
          price: found.price ?? "",
          features: found.features?.length ? found.features : [""],
          applications: found.applications?.length ? found.applications : [""],
          specifications: found.specifications?.length ? found.specifications : [{ label: "", value: "" }],
          seo: found.seo || emptyProduct.seo,
        });
      }
    });
  }, [id, isEdit]);

  const updateField = (field, value) => setProduct((p) => ({ ...p, [field]: value }));

  const updateListItem = (field, index, value) => {
    const list = [...product[field]];
    list[index] = value;
    updateField(field, list);
  };
  const addListItem = (field, empty = "") => updateField(field, [...product[field], empty]);
  const removeListItem = (field, index) => updateField(field, product[field].filter((_, i) => i !== index));

  const updateSpec = (index, key, value) => {
    const list = [...product.specifications];
    list[index] = { ...list[index], [key]: value };
    updateField("specifications", list);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded = await uploadImages(files, { alt: product.title || "Product image" });
      const newImages = uploaded.map((img, i) => ({
        ...img,
        isPrimary: product.images.length === 0 && i === 0,
      }));
      updateField("images", [...product.images, ...newImages]);
      toast.success("Images uploaded");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...product,
      price: product.price ? Number(product.price) : undefined,
      features: product.features.filter(Boolean),
      applications: product.applications.filter(Boolean),
      specifications: product.specifications.filter((s) => s.label && s.value),
    };

    try {
      if (isEdit) {
        await updateProduct(id, payload);
        toast.success("Product updated");
      } else {
        await createProduct(payload);
        toast.success("Product created");
      }
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{isEdit ? "Edit Product" : "Add Product"}</h1>

      <form onSubmit={handleSubmit} className="mt-8 max-w-3xl space-y-8">
        <div className="rounded-xl2 border border-ink/8 bg-white p-6">
          <h2 className="mb-4 font-semibold">Basics</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Title</label>
              <input required className={inputClass} value={product.title} onChange={(e) => updateField("title", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input className={inputClass} value={product.tagline} onChange={(e) => updateField("tagline", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <input className={inputClass} value={product.category} onChange={(e) => updateField("category", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Amazon URL</label>
              <input className={inputClass} value={product.amazonUrl} onChange={(e) => updateField("amazonUrl", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Price</label>
              <input type="number" step="0.01" className={inputClass} value={product.price} onChange={(e) => updateField("price", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Currency</label>
              <select className={inputClass} value={product.currency} onChange={(e) => updateField("currency", e.target.value)}>
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} value={product.status} onChange={(e) => updateField("status", e.target.value)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="coming-soon">Coming Soon</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Description</label>
            <textarea rows={4} className={inputClass} value={product.description} onChange={(e) => updateField("description", e.target.value)} required />
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={product.isFeatured} onChange={(e) => updateField("isFeatured", e.target.checked)} />
            Mark as featured product
          </label>
        </div>

        <div className="rounded-xl2 border border-ink/8 bg-white p-6">
          <h2 className="mb-4 font-semibold">Images</h2>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={uploading} />
          {uploading && <p className="mt-2 text-xs text-slate">Uploading…</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            {product.images.map((img, i) => (
              <div key={img.path || img.url} className="relative h-20 w-20 overflow-hidden rounded-lg border border-ink/10">
                <img src={img.url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => updateField("images", product.images.filter((_, idx) => idx !== i))}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
                >
                  <HiOutlineX size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl2 border border-ink/8 bg-white p-6">
          <h2 className="mb-4 font-semibold">Features</h2>
          {product.features.map((f, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input className={inputClass} value={f} onChange={(e) => updateListItem("features", i, e.target.value)} placeholder="e.g. Food-grade stainless steel" />
              <button type="button" onClick={() => removeListItem("features", i)} className="text-slate hover:text-red-500"><HiOutlineX /></button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem("features")} className="mt-1 flex items-center gap-1 text-sm text-brenn-yellow-dark"><HiOutlinePlus /> Add feature</button>
        </div>

        <div className="rounded-xl2 border border-ink/8 bg-white p-6">
          <h2 className="mb-4 font-semibold">Applications</h2>
          {product.applications.map((a, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input className={inputClass} value={a} onChange={(e) => updateListItem("applications", i, e.target.value)} placeholder="e.g. Commercial bakeries" />
              <button type="button" onClick={() => removeListItem("applications", i)} className="text-slate hover:text-red-500"><HiOutlineX /></button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem("applications")} className="mt-1 flex items-center gap-1 text-sm text-brenn-yellow-dark"><HiOutlinePlus /> Add application</button>
        </div>

        <div className="rounded-xl2 border border-ink/8 bg-white p-6">
          <h2 className="mb-4 font-semibold">Specifications</h2>
          {product.specifications.map((s, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input className={inputClass} placeholder="Label" value={s.label} onChange={(e) => updateSpec(i, "label", e.target.value)} />
              <input className={inputClass} placeholder="Value" value={s.value} onChange={(e) => updateSpec(i, "value", e.target.value)} />
              <button type="button" onClick={() => removeListItem("specifications", i)} className="text-slate hover:text-red-500"><HiOutlineX /></button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem("specifications", { label: "", value: "" })} className="mt-1 flex items-center gap-1 text-sm text-brenn-yellow-dark"><HiOutlinePlus /> Add specification</button>
        </div>


        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">{saving ? "Saving…" : "Save Product"}</button>
          <button type="button" onClick={() => navigate("/admin/products")} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;