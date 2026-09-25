import { supabase } from "../supabaseClient.js";

const TABLE = "website_content";
const ROW_KEY = "main";

const DEFAULTS = {
  hero: {
    heading: "Precision Brownie Divider",
    subheading: "Designed for Professionals.",
    description:
      "Cut perfect, uniform brownies every time with a tool engineered for bakeries and home kitchens that demand consistency.",
    primaryCtaLabel: "Buy on Amazon",
    primaryCtaUrl: "https://www.amazon.com",
    secondaryCtaLabel: "Learn More",
    bannerImage: "",
  },
  story: {
    heading: "Engineered in pursuit of the perfect cut.",
    mission:
      "To bring precision-engineered kitchen tools to every professional and home baker who refuses to compromise on consistency.",
    vision: "To become the most trusted name in premium bakeware and kitchen tools worldwide.",
    body:
      "Brenn Global started with a simple frustration: uneven, inconsistent cuts were costing bakeries time, product, and presentation. We set out to design a tool precise enough for commercial kitchens and simple enough for anyone to use. The Brownie Divider is our first step — many more precision tools are already in development.",
  },
  footer: {
    description: "Premium precision kitchen tools, engineered for professionals.",
    phone: "+91 84899 99988",
    email: "support@brennglobal.in",
    address: "Udumalaipettai, Tamil Nadu, India",
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
      linkedin: "https://linkedin.com",
    },
    whatsappNumber: "918489999988",
  },
};

// Fetch the singleton website_content row, creating it with defaults on
// first run if it doesn't exist yet (mirrors the old getOrCreateContent()).
export const getWebsiteContent = async () => {
  const { data, error } = await supabase.from(TABLE).select("*").eq("key", ROW_KEY).maybeSingle();
  if (error) throw error;

  if (!data) {
    const { data: created, error: createError } = await supabase
      .from(TABLE)
      .insert({ key: ROW_KEY, ...DEFAULTS })
      .select()
      .single();
    if (createError) throw createError;
    return { hero: created.hero, story: created.story, footer: created.footer };
  }

  return { hero: data.hero, story: data.story, footer: data.footer };
};

// Partial deep-merge update per section (hero / story / footer), same
// contract as the old PUT /api/website endpoint.
export const updateWebsiteContent = async (sections) => {
  const current = await getWebsiteContent();
  const merged = {
    hero: sections.hero ? { ...current.hero, ...sections.hero } : current.hero,
    story: sections.story ? { ...current.story, ...sections.story } : current.story,
    footer: sections.footer ? { ...current.footer, ...sections.footer } : current.footer,
  };

  const { data, error } = await supabase
    .from(TABLE)
    .update(merged)
    .eq("key", ROW_KEY)
    .select()
    .single();
  if (error) throw error;

  return { hero: data.hero, story: data.story, footer: data.footer };
};
