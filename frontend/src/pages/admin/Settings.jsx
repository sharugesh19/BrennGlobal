import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getSettings, updateSettings } from "../../lib/api/settings.js";
import { SkeletonBlock } from "../../components/ui/Skeleton.jsx";

const inputClass = "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm outline-none focus:border-brenn-yellow";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate";

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings({
        siteName: settings.siteName,
        logoUrl: settings.logoUrl,
        theme: settings.theme,
        analytics: settings.analytics,
      });
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (!settings) return <SkeletonBlock className="h-96" />;

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-slate">Site-wide branding and analytics configuration.</p>

      <div className="mt-8 max-w-xl space-y-8">
        <section className="rounded-xl2 border border-ink/8 bg-white p-6">
          <h2 className="mb-4 font-semibold">Branding</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Website Name</label>
              <input className={inputClass} value={settings.siteName} onChange={(e) => setSettings((s) => ({ ...s, siteName: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Logo URL</label>
              <input className={inputClass} value={settings.logoUrl} onChange={(e) => setSettings((s) => ({ ...s, logoUrl: e.target.value }))} placeholder="Upload via Media Manager, then paste URL here" />
            </div>
          </div>
        </section>

        <section className="rounded-xl2 border border-ink/8 bg-white p-6">
          <h2 className="mb-4 font-semibold">Theme Colors</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Primary Color</label>
              <input type="color" className="h-11 w-full rounded-xl border border-ink/12" value={settings.theme.primaryColor} onChange={(e) => setSettings((s) => ({ ...s, theme: { ...s.theme, primaryColor: e.target.value } }))} />
            </div>
            <div>
              <label className={labelClass}>Accent Color</label>
              <input type="color" className="h-11 w-full rounded-xl border border-ink/12" value={settings.theme.accentColor} onChange={(e) => setSettings((s) => ({ ...s, theme: { ...s.theme, accentColor: e.target.value } }))} />
            </div>
          </div>
        </section>

        <section className="rounded-xl2 border border-ink/8 bg-white p-6">
          <h2 className="mb-4 font-semibold">Analytics</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Google Analytics ID</label>
              <input className={inputClass} value={settings.analytics.googleAnalyticsId} onChange={(e) => setSettings((s) => ({ ...s, analytics: { ...s.analytics, googleAnalyticsId: e.target.value } }))} placeholder="G-XXXXXXXXXX" />
            </div>
            <div>
              <label className={labelClass}>Meta Pixel ID</label>
              <input className={inputClass} value={settings.analytics.metaPixelId} onChange={(e) => setSettings((s) => ({ ...s, analytics: { ...s.analytics, metaPixelId: e.target.value } }))} />
            </div>
          </div>
        </section>

        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
