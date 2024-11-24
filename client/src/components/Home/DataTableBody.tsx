import { Link } from "react-router-dom";
import { useCrudStore } from "../../Store/UseCrudStore";
import { Crud } from "../../types/Crud.type";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../../Store/UseAuthStore";
type BodyProps = {
  item: Crud;
  count: number;
};
const DataTableBody = ({ item, count }: BodyProps) => {
  const { deleteCrudItem, deleteLoading } = useCrudStore();
  const { user } = useAuthStore();

  return (
    <tr className="text-center text-xs sm:text-sm">
      <th>{count}</th>
      <td>{item?.title}</td>
      <td>{item?.genre}</td>
      <td>{item?.pages}</td>
      <td>{item?.author?.name}</td>
      {item.author?._id === user?._id && (
        <td className="flex flex-col items-center sm:flex-row gap-2 justify-center">
          <button
            className="btn btn-error btn-xs text-white px-3"
            onClick={() => deleteCrudItem(item?._id as string)}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <span>Del</span>
            )}
          </button>
          <Link
            to={`/update/${item?._id}`}
            className="btn btn-warning btn-xs text-primary px-3"
          >
            <span>Edit</span>
          </Link>
        </td>
      )}
    </tr>
  );
};

export default DataTableBody;
