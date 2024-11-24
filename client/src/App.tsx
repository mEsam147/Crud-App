
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./Store/UseAuthStore";
import Layout from "./components/Layout/Layout";
import useCheckAuth from "./hooks/useCheckAuth";
import AllRoutes from "./components/AllRoutes";

function App() {
  const { checkAuth } = useAuthStore();

  useCheckAuth();

  if (checkAuth) return null;

  return (
    <Layout>
      <Toaster />
      <AllRoutes />
    </Layout>
  );
}

export default App;
