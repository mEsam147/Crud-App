import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import CreateItem from "../pages/CreateItem";
import UpdateItem from "../pages/UpdateItem";
import RegisterPage from "../pages/auth/RegisterPage";
import { useAuthStore } from "../Store/UseAuthStore";

const AllRoutes = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <HomePage /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to={"/"} />}
      />
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to={"/"} />}
      />
      <Route
        path="/create"
        element={user && isAdmin ? <CreateItem /> : <Navigate to={"/"} />}
      />
      <Route
        path="/update/:id"
        element={user && isAdmin ? <UpdateItem /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
};

export default AllRoutes;
