import { create } from "zustand";
import { Crud } from "../types/Crud.type";
import axios from "../utils/Axios";
import Swal from "sweetalert2";
interface CrudState {
  crud: Crud[];
  singleCrudItem: Crud | null;
  crudLoading: boolean;
  singleCrudItemLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  updateLoading: boolean;
  getAllCruds: () => void;
  getSingleItem: (id: string) => void;
  createNewCrudItem: (data: Crud) => void;
  deleteCrudItem: (id: string) => void;
  updateCrudItem: (id: string, data: Crud) => void;
}
export const useCrudStore = create<CrudState>((set) => ({
  crud: [],
  singleCrudItem: null,
  crudLoading: false,
  singleCrudItemLoading: false,
  createLoading: false,
  deleteLoading: false,
  updateLoading: false,
  getAllCruds: async () => {
    set({ crudLoading: true });
    try {
      const res = await axios.get("/crud");

      set({ crud: res.data, crudLoading: false });
    } catch (error) {
      set({ crudLoading: false });
      console.log(error);
    }
  },

  getSingleItem: async (id: string) => {
    set({ singleCrudItemLoading: true });
    try {
      const res = await axios.get(`/crud/${id}`);

      set({ singleCrudItem: res.data, singleCrudItemLoading: false });
    } catch (error) {
      set({ singleCrudItemLoading: false });
      console.log(error);
    }
  },
  createNewCrudItem: async (data: Crud) => {
    set({ createLoading: true });
    try {
      const res = await axios.post("/crud", data);
      set((state) => ({
        crud: [...state.crud, res.data],
        createLoading: false,
      }));
    } catch (error) {
      set({ createLoading: false });
      console.error(`Error creating CRUD item: ${error}`);
    } finally {
      set({ createLoading: false });
    }
  },
  deleteCrudItem: async (id: string) => {
    set((state) => ({ ...state, deleteLoading: true }));

    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      try {
        await axios.delete(`/crud/${id}`);
        set((state) => ({
          crud: state.crud.filter((item) => item._id !== id),
          deleteLoading: false,
        }));
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
        });
      } catch (error) {
        set({ deleteLoading: false });
        console.error(`Error deleting CRUD item: ${error}`);
      }
    } else {
      set({ deleteLoading: false });
    }
  },
  updateCrudItem: async (id: string, data: Crud) => {
    set({ updateLoading: true });
    try {
      await axios.put(`/crud/${id}`, data);

      set((state) => ({
        crud: state.crud.map((item) =>
          item._id === id ? { ...item, ...data } : item
        ),
        updateLoading: false,
      }));
    } catch (error) {
      set({ updateLoading: false });
      console.log(error);
    }
  },
}));
