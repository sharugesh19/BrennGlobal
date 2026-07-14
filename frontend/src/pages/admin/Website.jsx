import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getWebsiteContent, updateWebsiteContent } from "../../lib/api/websiteContent.js";
import { SkeletonBlock } from "../../components/ui/Skeleton.jsx";

const inputClass = "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm outline-none focus:border-brenn-yellow";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate";

const Website = () => {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getWebsiteContent().then(setContent);
  }, []);

  const updateSection = (section, field, value) => {
    setContent((c) => ({ ...c, [section]: { ...c[section], [field]: value } }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateWebsiteContent({
        hero: content.hero,
        story: content.story,
        footer: content.footer,
      });
      toast.success("Website content updated");
    } catch (err) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (!content) {
    return <SkeletonBlock className="h-96" />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Website Content</h1>
      <p className="mt-1 text-sm text-slate">Edit the copy shown across the public site.</p>

      <div className="mt-8 max-w-3xl space-y-8">
        <section className="rounded-xl2 border border-ink/8 bg-white p-6">
          <h2 className="mb-4 font-semibold">Hero</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Heading</label>
              <input className={inputClass} value={content.hero.heading} onChange={(e) => updateSection("hero", "heading", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Subheading</label>
              <input className={inputClass} value={content.hero.subheading} onChange={(e) => updateSection("hero", "subheading", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea rows={3} className={inputClass} value={content.hero.description} onChange={(e) => updateSection("hero", "description", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Primary CTA Label</label>
                <input className={inputClass} value={content.hero.primaryCtaLabel} onChange={(e) => updateSection("hero", "primaryCtaLabel", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Primary CTA URL</label>
                <input className={inputClass} value={content.hero.primaryCtaUrl} onChange={(e) => updateSection("hero", "primaryCtaUrl", e.target.value)} />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl2 border border-ink/8 bg-white p-6">
          <h2 className="mb-4 font-semibold">Company Story</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Heading</label>
              <input className={inputClass} value={content.story.heading} onChange={(e) => updateSection("story", "heading", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Mission</label>
              <textarea rows={2} className={inputClass} value={content.story.mission} onChange={(e) => updateSection("story", "mission", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Vision</label>
              <textarea rows={2} className={inputClass} value={content.story.vision} onChange={(e) => updateSection("story", "vision", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Body</label>
              <textarea rows={4} className={inputClass} value={content.story.body} onChange={(e) => updateSection("story", "body", e.target.value)} />
            </div>
          </div>
        </section>

        <section className="rounded-xl2 border border-ink/8 bg-white p-6">
          <h2 className="mb-4 font-semibold">Footer & Contact</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Description</label>
              <textarea rows={2} className={inputClass} value={content.footer.description} onChange={(e) => updateSection("footer", "description", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone</label>
                <input className={inputClass} value={content.footer.phone} onChange={(e) => updateSection("footer", "phone", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input className={inputClass} value={content.footer.email} onChange={(e) => updateSection("footer", "email", e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input className={inputClass} value={content.footer.address} onChange={(e) => updateSection("footer", "address", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>WhatsApp Number (with country code, no +)</label>
              <input className={inputClass} value={content.footer.whatsappNumber} onChange={(e) => updateSection("footer", "whatsappNumber", e.target.value)} />
            </div>
          </div>
        </section>

        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Website;
