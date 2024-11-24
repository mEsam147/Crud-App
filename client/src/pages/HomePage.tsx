import DataTable from "../components/Home/DataTable";
import { Link } from "react-router-dom";
import useGetAllCruds from "../hooks/useGetAllCruds";

const HomePage = () => {
  useGetAllCruds();

  return (
    <div>
      <Link to={"/create"} className="btn btn-info btn-sm my-6">
        Add Item
      </Link>
      <DataTable />
    </div>
  );
};

export default HomePage;
