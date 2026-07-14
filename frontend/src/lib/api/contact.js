import { supabase } from "../supabaseClient.js";

const TABLE = "contact_messages";

const rowToMessage = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone || "",
  subject: row.subject || "",
  message: row.message,
  status: row.status || "new",
  createdAt: row.created_at,
});

// Public — anyone can submit the contact form. RLS only allows INSERT
// for anonymous/public role, not SELECT/UPDATE/DELETE.
export const submitContactMessage = async ({ name, email, phone, subject, message }) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ name, email, phone, subject, message })
    .select()
    .single();
  if (error) throw error;
  return rowToMessage(data);
};

// Admin only (enforced by RLS — requires an authenticated session).
export const listContactMessages = async () => {
  const { data, error } = await supabase.from(TABLE).select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(rowToMessage);
};

export const updateMessageStatus = async (id, status) => {
  const { data, error } = await supabase.from(TABLE).update({ status }).eq("id", id).select().single();
  if (error) throw error;
  return rowToMessage(data);
};

export const deleteContactMessage = async (id) => {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
};
