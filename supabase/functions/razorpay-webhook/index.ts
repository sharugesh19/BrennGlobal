// @ts-nocheck
import { createClient } from "npm:@supabase/supabase-js@2";

const toHex = (buf: ArrayBuffer) =>
  Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("ok");

  const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET");
  if (!secret) return new Response("Not configured", { status: 500 });

  // Razorpay signs the raw body. We recreate the signature and compare.
  const body = await req.text();
  const received = req.headers.get("x-razorpay-signature") ?? "";

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const expected = toHex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body)));

  if (expected !== received) return new Response("Invalid signature", { status: 400 });

  try {
    const event = JSON.parse(body);

    if (event.event === "payment.captured" || event.event === "order.paid") {
      const payment = event.payload?.payment?.entity;
      const razorpayOrderId = payment?.order_id ?? event.payload?.order?.entity?.id;

      if (razorpayOrderId) {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );

        await supabase
          .from("orders")
          .update({
            payment_status: "paid",
            ...(payment?.id ? { razorpay_payment_id: payment.id } : {}),
          })
          .eq("razorpay_order_id", razorpayOrderId);
      }
    }
  } catch (err) {
    console.error(err);
  }

  return new Response("ok");
});
