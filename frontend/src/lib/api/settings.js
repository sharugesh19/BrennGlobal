import { supabase } from "../supabaseClient.js";

const TABLE = "site_settings";
const ROW_KEY = "main";

const DEFAULTS = {
  site_name: "Brenn Global",
  logo_url: "",
  theme: { primaryColor: "#FFC107", accentColor: "#D4AF37" },
  analytics: { googleAnalyticsId: "", metaPixelId: "" },
};

const rowToSettings = (row) => ({
  siteName: row.site_name,
  logoUrl: row.logo_url || "",
  theme: row.theme || DEFAULTS.theme,
  analytics: row.analytics || DEFAULTS.analytics,
});

export const getSettings = async () => {
  const { data, error } = await supabase.from(TABLE).select("*").eq("key", ROW_KEY).maybeSingle();
  if (error) throw error;

  if (!data) {
    const { data: created, error: createError } = await supabase
      .from(TABLE)
      .insert({ key: ROW_KEY, ...DEFAULTS })
      .select()
      .single();
    if (createError) throw createError;
    return rowToSettings(created);
  }

  return rowToSettings(data);
};

export const updateSettings = async ({ siteName, logoUrl, theme, analytics }) => {
  const row = {};
  if (siteName !== undefined) row.site_name = siteName;
  if (logoUrl !== undefined) row.logo_url = logoUrl;
  if (theme !== undefined) row.theme = theme;
  if (analytics !== undefined) row.analytics = analytics;

  const { data, error } = await supabase.from(TABLE).update(row).eq("key", ROW_KEY).select().single();
  if (error) throw error;
  return rowToSettings(data);
};
