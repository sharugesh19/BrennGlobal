import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../lib/supabaseClient.js";
import { SkeletonBlock } from "../../components/ui/Skeleton.jsx";

const PAYMENT_STYLES = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-gray-100 text-gray-500",
};

const ORDER_STYLES = {
  new: "bg-brenn-yellow/20 text-brenn-yellow-dark",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

const symbol = (currency) =>
  currency === "INR" ? "₹" : currency === "USD" ? "$" : `${currency} `;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUnpaid, setShowUnpaid] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) toast.error("Could not load orders");
    else setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id, order_status) => {
    const { error } = await supabase.from("orders").update({ order_status }).eq("id", id);
    if (error) {
      toast.error("Failed to update status");
    } else {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, order_status } : o)));
    }
  };

  const visible = showUnpaid ? orders : orders.filter((o) => o.payment_status === "paid");

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="mt-1 text-sm text-slate">Orders placed through the website.</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate">
          <input
            type="checkbox"
            checked={showUnpaid}
            onChange={(e) => setShowUnpaid(e.target.checked)}
          />
          Show unpaid attempts
        </label>
      </div>

      <div className="mt-8 space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonBlock key={i} className="h-36 rounded-xl2" />)
        ) : visible.length === 0 ? (
          <p className="text-sm text-slate">No orders yet.</p>
        ) : (
          visible.map((o) => (
            <div key={o.id} className="rounded-xl2 border border-ink/8 bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-slate">#{o.id.slice(0, 8).toUpperCase()}</p>
                  <p className="mt-1 font-semibold">{o.customer_name}</p>
                  <p className="text-sm text-slate">
                    {o.customer_phone} · {o.customer_email}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      PAYMENT_STYLES[o.payment_status] || PAYMENT_STYLES.pending
                    }`}
                  >
                    {o.payment_status}
                  </span>
                  <select
                    value={o.order_status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className={`rounded-full border-none px-3 py-1 text-xs font-medium capitalize outline-none ${
                      ORDER_STYLES[o.order_status] || ORDER_STYLES.new
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <ul className="mt-4 divide-y divide-ink/8 text-sm">
                {(o.items || []).map((item, i) => (
                  <li key={i} className="flex justify-between py-2">
                    <span>
                      {item.title} <span className="text-slate">× {item.quantity}</span>
                    </span>
                    <span>
                      {symbol(o.currency)}
                      {item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex justify-between border-t border-ink/8 pt-3 font-bold">
                <span>Total</span>
                <span>
                  {symbol(o.currency)}
                  {o.total}
                </span>
              </div>

              <p className="mt-4 text-sm text-ink/80">
                <span className="font-medium">Deliver to:</span> {o.address}, {o.city}, {o.state} -{" "}
                {o.pincode}
              </p>
              <p className="mt-2 text-xs text-slate">{new Date(o.created_at).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;