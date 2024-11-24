import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCrudStore } from "../Store/UseCrudStore";
import { motion } from "framer-motion";
import { Crud } from "../types/Crud.type";
import { Loader2 } from "lucide-react";

const UpdateItem = () => {
  const {
    getSingleItem,
    singleCrudItem,
    updateLoading,
    updateCrudItem,
    singleCrudItemLoading,
  } = useCrudStore();

  const crudData: Crud = {
    title: singleCrudItem?.title ?? "",
    pages: singleCrudItem?.pages ?? 0,
    genre: singleCrudItem?.genre ?? "",
  };
  const [formData, setFormData] = useState(crudData);
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getSingleItem(id);
    }
  }, [id, getSingleItem]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      updateCrudItem(id, { ...formData });
      navigate("/");
    }
  };
  if (singleCrudItemLoading) {
    return (
      <div className="flex justify-center items-center my-20">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="my-10 max-w-2xl mx-auto px-4 sm:px-0"
    >
      <h1 className="text-center w-full text-slate-700 text-2xl font-semibold">
        Update Item
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-y-2">
          <label className="text-sm font-bold text-gray-400">Title</label>

          <input
            type="text"
            className="input input-bordered input-sm sm:input-md"
            placeholder="Amazing Novel"
            name="title"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
        </div>
        <div className="mb-4 flex flex-col gap-y-2">
          <label className="text-sm font-bold text-gray-400">Pages</label>

          <input
            type="text"
            className="input input-bordered input-sm sm:input-md"
            placeholder="200 Pages"
            name="pages"
            value={formData.pages}
            onChange={(e) => {
              const pagesValue = e.target.value;
              setFormData({ ...formData, pages: parseInt(pagesValue) || 0 });
            }}
          />
        </div>
        <div className="mb-4 flex flex-col gap-y-2">
          <label className="text-sm font-bold text-gray-400">Genre</label>

          <input
            type="text"
            className="input input-bordered input-sm sm:input-md"
            placeholder="Fiction"
            name="genre"
            value={formData.genre}
            onChange={(e) => {
              setFormData({ ...formData, genre: e.target.value });
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm sm:btn-md w-full font-bold "
          disabled={updateLoading}
        >
          {updateLoading ? (
            <>
              <Loader2 className="animate-spin" />
              updating...
            </>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default UpdateItem;
