import { supabase } from "../supabaseClient.js";

// Runs a handful of lightweight count queries + a recent-messages query in
// parallel, replacing the old single /api/dashboard/stats endpoint.
export const getDashboardStats = async () => {
  const [
    totalProducts,
    publishedProducts,
    comingSoonProducts,
    totalEnquiries,
    newEnquiries,
    recentEnquiries,
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "coming-soon"),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const firstError = [
    totalProducts,
    publishedProducts,
    comingSoonProducts,
    totalEnquiries,
    newEnquiries,
    recentEnquiries,
  ].find((r) => r.error)?.error;
  if (firstError) throw firstError;

  return {
    totalProducts: totalProducts.count || 0,
    publishedProducts: publishedProducts.count || 0,
    comingSoonProducts: comingSoonProducts.count || 0,
    totalEnquiries: totalEnquiries.count || 0,
    newEnquiries: newEnquiries.count || 0,
    recentEnquiries: (recentEnquiries.data || []).map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      status: m.status,
      createdAt: m.created_at,
    })),
  };
};
