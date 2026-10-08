// @ts-nocheck
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { customer, items } = await req.json();

    if (!customer?.name || !customer?.phone || !customer?.email || !customer?.address) {
      return json({ error: "Missing customer details" }, 400);
    }
    if (!Array.isArray(items) || items.length === 0) {
      return json({ error: "Cart is empty" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Look up real prices from the database. Never trust prices sent by the browser.
    const slugs = items.map((i: { slug: string }) => i.slug);
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("slug, title, price, currency, status")
      .in("slug", slugs);

    if (productsError) return json({ error: "Could not load products" }, 500);

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = products?.find((p) => p.slug === item.slug);
      const quantity = Number(item.quantity);

      if (!product || product.status !== "published" || !product.price) {
        return json({ error: `"${item.title || item.slug}" is not available` }, 400);
      }
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        return json({ error: "Invalid quantity" }, 400);
      }
      if (product.currency !== "INR") {
        return json({ error: "Only INR products can be paid online" }, 400);
      }

      const price = Number(product.price);
      total += price * quantity;
      orderItems.push({ slug: product.slug, title: product.title, price, quantity });
    }

    // Save the order as "pending" first.
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_email: customer.email,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        items: orderItems,
        total,
        currency: "INR",
        payment_status: "pending",
      })
      .select("id")
      .single();

    if (orderError || !order) return json({ error: "Could not save order" }, 500);

    // Create the payment order on Razorpay (amount is in paise).
    const keyId = Deno.env.get("RAZORPAY_KEY_ID")!;
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;

    const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${keyId}:${keySecret}`),
      },
      body: JSON.stringify({
        amount: Math.round(total * 100),
        currency: "INR",
        receipt: order.id,
      }),
    });

    const rzpOrder = await rzpResponse.json();
    if (!rzpResponse.ok) {
      console.error("Razorpay error:", rzpOrder);
      return json({ error: "Could not start payment" }, 500);
    }

    await supabase
      .from("orders")
      .update({ razorpay_order_id: rzpOrder.id })
      .eq("id", order.id);

    return json({
      orderId: order.id,
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      keyId,
    });
  } catch (err) {
    console.error(err);
    return json({ error: "Something went wrong" }, 500);
  }
});