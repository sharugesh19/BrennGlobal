import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore.js";
import { supabase } from "../lib/supabaseClient.js";

const symbol = (currency) =>
  currency === "INR" ? "₹" : currency === "USD" ? "$" : `${currency} `;

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-brenn-yellow";

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Field = ({ name, label, type = "text", placeholder, value, error, onChange }) => (
  <div>
    <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputClass}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const Checkout = () => {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const currency = items[0]?.currency || "INR";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");
  const [paidOrderId, setPaidOrderId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your name";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit mobile number";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email";
    if (!form.address.trim()) e.address = "Enter your address";
    if (!form.city.trim()) e.city = "Enter your city";
    if (!form.state.trim()) e.state = "Enter your state";
    if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = "Enter a 6-digit pincode";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setPaying(true);

    const loaded = await loadRazorpay();
    if (!loaded) {
      setMessage("Could not load the payment window. Check your internet and try again.");
      setPaying(false);
      return;
    }

    // 1. Ask our server to create the order (prices are checked on the server).
    const { data, error } = await supabase.functions.invoke("create-order", {
      body: {
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          pincode: form.pincode.trim(),
        },
        items: items.map((i) => ({ slug: i.slug, title: i.title, quantity: i.quantity })),
      },
    });

    if (error || !data?.razorpayOrderId) {
      setMessage(data?.error || "Could not start the payment. Please try again.");
      setPaying(false);
      return;
    }

    // 2. Open the Razorpay payment window.
    const rzp = new window.Razorpay({
      key: data.keyId,
      amount: data.amount,
      currency: data.currency,
      order_id: data.razorpayOrderId,
      name: "Brenn Global",
      description: "Order payment",
      prefill: {
        name: form.name.trim(),
        email: form.email.trim(),
        contact: form.phone.trim(),
      },
      theme: { color: "#FFC107" },
      handler: async (response) => {
        // 3. Payment done: ask our server to confirm it is real.
        const { data: result, error: verifyError } = await supabase.functions.invoke(
          "verify-payment",
          { body: response }
        );

        if (verifyError || !result?.success) {
          setMessage(
            "Payment received but we could not confirm it. Please contact us with your payment ID: " +
              response.razorpay_payment_id
          );
          setPaying(false);
          return;
        }

        clearCart();
        setPaidOrderId(result.orderId);
        setPaying(false);
      },
      modal: {
        ondismiss: () => setPaying(false),
      },
    });

    rzp.on("payment.failed", () => {
      setMessage("Payment failed. You can try again.");
      setPaying(false);
    });

    rzp.open();
  };

  if (paidOrderId) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-40 text-center">
        <h1 className="text-3xl font-bold">Thank you! Order placed.</h1>
        <p className="mt-3 text-slate">
          Your payment was successful. Order reference:{" "}
          <span className="font-mono">{paidOrderId.slice(0, 8).toUpperCase()}</span>
        </p>
        <Link to="/products" className="btn-dark mt-8 inline-flex">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-40 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-slate">Add a product before checking out.</p>
        <Link to="/products" className="btn-dark mt-8 inline-flex">
          Browse Products
        </Link>
      </div>
    );
  }

  const fieldProps = (name) => ({
    name,
    value: form[name],
    error: errors[name],
    onChange: handleChange,
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-40 sm:px-10 lg:px-16">
      <h1 className="text-4xl font-extrabold tracking-tight">Checkout</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-3" noValidate>
          <h2 className="text-lg font-bold">Delivery details</h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Full name" placeholder="Your name" {...fieldProps("name")} />
            <Field
              label="Mobile number"
              type="tel"
              placeholder="10-digit number"
              {...fieldProps("phone")}
            />
          </div>

          <Field
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...fieldProps("email")}
          />

          <div>
            <label htmlFor="address" className="mb-1.5 block text-sm font-medium">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={form.address}
              onChange={handleChange}
              placeholder="House no, street, area"
              className={inputClass}
            />
            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field label="City" {...fieldProps("city")} />
            <Field label="State" {...fieldProps("state")} />
            <Field label="Pincode" placeholder="6 digits" {...fieldProps("pincode")} />
          </div>

          {message && <p className="text-sm text-red-500">{message}</p>}

          <button type="submit" disabled={paying} className="btn-primary w-full disabled:opacity-60">
            {paying ? "Please wait..." : "Pay Now"}
          </button>
        </form>

        <aside className="h-fit rounded-xl2 border border-ink/10 bg-cloud p-6 lg:col-span-2">
          <h2 className="text-lg font-bold">Order summary</h2>
          <ul className="mt-4 divide-y divide-ink/10">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4 py-3 text-sm">
                <span>
                  {item.title} <span className="text-slate">× {item.quantity}</span>
                </span>
                <span className="font-medium">
                  {symbol(item.currency)}
                  {item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 text-lg font-bold">
            <span>Total</span>
            <span>
              {symbol(currency)}
              {total}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;