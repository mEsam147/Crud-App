import { useState } from "react";
import { Crud } from "../types/Crud.type";
import { useCrudStore } from "../Store/UseCrudStore";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'

const CreateItem = () => {
  const crudData: Crud = {
    title: "",
    pages: 0,
    genre: "",
  };
  const [formData, setFormData] = useState(crudData);
  const { createNewCrudItem, createLoading } = useCrudStore();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, pages, genre } = formData;
    if (!title.trim() || pages === 0 || !genre.trim()) return;

    createNewCrudItem({ ...formData });
    setFormData(crudData);
    navigate("/");
  };

  return (
    <motion.div
    
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="my-10 max-w-2xl mx-auto px-4 sm:px-0">
      <h1 className="text-center w-full text-slate-700 text-2xl font-semibold">
        Create Item
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm sm:btn-md w-full font-bold "
          disabled={createLoading}
        >
          {createLoading ? (
            <>
              <Loader2 className="animate-spin" />
              creating...
            </>
          ) : (
            "Create"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateItem;
