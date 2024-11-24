import { LoaderCircle } from "lucide-react";
import { useCrudStore } from "../../Store/UseCrudStore";
import DataTableBody from "./DataTableBody";
import { motion } from "framer-motion";

const DataTable = () => {
  const { crud, crudLoading } = useCrudStore();

  if (crudLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle className="animate-spin size-8" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }
  if (crud.length === 0) {
    return (
      <div className="flex justify-center items-center my-20">
        <span className="text-secondary font-semibold text-2xl text-center">
          OOPS!No items found 🥲
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto my-6"
    >
      <table className="table w-full">
        {/* head */}
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Genre</th>
            <th className="px-4 py-2">pages</th>
            <th className="px-4 py-2">author</th>
            <th className="px-4 py-2">actions</th>
          </tr>
        </thead>
        <tbody>
          {crud.map((item, index) => (
            <DataTableBody key={item._id} item={item} count={index + 1} />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DataTable;
