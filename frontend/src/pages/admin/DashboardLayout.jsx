import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineGlobeAlt,
  HiOutlinePhotograph,
  HiOutlineMail,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext.jsx";

const NAV = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <HiOutlineViewGrid /> },
  { label: "Products", to: "/admin/products", icon: <HiOutlineCube /> },
  { label: "Website", to: "/admin/website", icon: <HiOutlineGlobeAlt /> },
  { label: "Media", to: "/admin/media", icon: <HiOutlinePhotograph /> },
  { label: "Enquiries", to: "/admin/enquiries", icon: <HiOutlineMail /> },
  { label: "Settings", to: "/admin/settings", icon: <HiOutlineCog /> },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-cloud">
      <aside className="fixed inset-y-0 left-0 flex w-64 flex-col bg-ink text-white">
        <div className="px-6 py-7">
          <span className="font-display text-lg font-extrabold tracking-tight">
            BRENN <span className="text-brenn-yellow">GLOBAL</span>
          </span>
          <p className="mt-0.5 text-xs text-white/40">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive ? "bg-brenn-yellow text-ink" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="truncate px-2 text-xs text-white/40">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <HiOutlineLogout className="text-lg" />
            Log Out
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
