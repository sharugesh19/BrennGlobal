import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              style: { fontFamily: "Inter, sans-serif", fontSize: "14px" },
              success: { iconTheme: { primary: "#FFC107", secondary: "#0A0A0B" } },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
