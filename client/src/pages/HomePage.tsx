import DataTable from "../components/Home/DataTable";
import { Link } from "react-router-dom";
import useGetAllCruds from "../hooks/useGetAllCruds";
import { useAuthStore } from "../Store/UseAuthStore";

const HomePage = () => {
  const { user } = useAuthStore();
  useGetAllCruds();

  return (
    <div>
      {user && (
        <Link to={"/create"} className="btn btn-info btn-sm my-6">
          Add Item
        </Link>
      )}
      <DataTable />
    </div>
  );
};

export default HomePage;
