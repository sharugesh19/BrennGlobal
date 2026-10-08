import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import WhatsAppButton from "../components/layout/WhatsAppButton.jsx";
import Loader from "../components/ui/Loader.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const ProductsList = lazy(() => import("../pages/Products.jsx"));
const ProductDetail = lazy(() => import("../pages/ProductDetail.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const Contact = lazy(() => import("../pages/Contact.jsx"));
const Checkout = lazy(() => import("../pages/Checkout.jsx"));
const Policy = lazy(() => import("../pages/Policy.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

const Login = lazy(() => import("../pages/admin/Login.jsx"));
const DashboardLayout = lazy(() => import("../pages/admin/DashboardLayout.jsx"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard.jsx"));
const Products = lazy(() => import("../pages/admin/Products.jsx"));
const ProductForm = lazy(() => import("../pages/admin/ProductForm.jsx"));
const Website = lazy(() => import("../pages/admin/Website.jsx"));
const ContactEnquiries = lazy(() => import("../pages/admin/ContactEnquiries.jsx"));
const Orders = lazy(() => import("../pages/admin/Orders.jsx"));
const Settings = lazy(() => import("../pages/admin/Settings.jsx"));

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </>
);

const PageFallback = () => <Loader fullScreen />;

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/products" element={<PublicLayout><ProductsList /></PublicLayout>} />
        <Route path="/products/:slug" element={<PublicLayout><ProductDetail /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
        <Route path="/terms-and-conditions" element={<PublicLayout><Policy type="terms" /></PublicLayout>} />
        <Route path="/privacy-policy" element={<PublicLayout><Policy type="privacy" /></PublicLayout>} />
        <Route path="/refund-policy" element={<PublicLayout><Policy type="refund" /></PublicLayout>} />
        <Route path="/shipping-policy" element={<PublicLayout><Policy type="shipping" /></PublicLayout>} />

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
          <Route path="orders" element={<Orders />} />
          <Route path="enquiries" element={<ContactEnquiries />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;