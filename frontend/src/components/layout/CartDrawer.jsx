import { Link } from "react-router-dom";
import { HiX, HiPlus, HiMinus, HiTrash } from "react-icons/hi";
import { useCartStore } from "../../store/useCartStore.js";

const symbol = (currency) =>
  currency === "INR" ? "₹" : currency === "USD" ? "$" : `${currency} `;

const CartDrawer = () => {
  const { items, isOpen, closeCart, increase, decrease, removeItem } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const currency = items[0]?.currency || "INR";

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button aria-label="Close cart" onClick={closeCart} className="text-2xl">
            <HiX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-slate">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col">
                    <Link
                      to={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="font-medium leading-snug"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm text-slate">
                      {symbol(item.currency)}
                      {item.price}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3 rounded-full border border-ink/15 px-3 py-1">
                        <button aria-label="Decrease quantity" onClick={() => decrease(item.id)}>
                          <HiMinus />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button aria-label="Increase quantity" onClick={() => increase(item.id)}>
                          <HiPlus />
                        </button>
                      </div>
                      <button
                        aria-label="Remove item"
                        onClick={() => removeItem(item.id)}
                        className="text-slate hover:text-red-500"
                      >
                        <HiTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-5">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                {symbol(currency)}
                {total}
              </span>
            </div>
            <Link to="/checkout" onClick={closeCart} className="btn-primary mt-4 w-full">
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;