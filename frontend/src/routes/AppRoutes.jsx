import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import WhatsAppButton from "../components/layout/WhatsAppButton.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const ProductDetail = lazy(() => import("../pages/ProductDetail.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const Contact = lazy(() => import("../pages/Contact.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

const Login = lazy(() => import("../pages/admin/Login.jsx"));
const DashboardLayout = lazy(() => import("../pages/admin/DashboardLayout.jsx"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard.jsx"));
const Products = lazy(() => import("../pages/admin/Products.jsx"));
const ProductForm = lazy(() => import("../pages/admin/ProductForm.jsx"));
const Website = lazy(() => import("../pages/admin/Website.jsx"));
const Media = lazy(() => import("../pages/admin/Media.jsx"));
const ContactEnquiries = lazy(() => import("../pages/admin/ContactEnquiries.jsx"));
const Settings = lazy(() => import("../pages/admin/Settings.jsx"));

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </>
);

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center text-sm text-slate">Loading…</div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/products/:slug" element={<PublicLayout><ProductDetail /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          <Route path="website" element={<Website />} />
          <Route path="media" element={<Media />} />
          <Route path="enquiries" element={<ContactEnquiries />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
