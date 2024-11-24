import { create } from "zustand";
import { User } from "../types/User.type";
import axios from "../utils/Axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface AuthState {
  user: User | null;
  registerLoading: boolean;
  loginLoading: boolean;
  checkAuth: boolean;

  register: (data: User) => Promise<void>;
  login: (data: User) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  registerLoading: false,
  loginLoading: false,
  checkAuth: true,
  register: async (data: User) => {
    set({ registerLoading: true });
    try {
      const res = await axios.post("/user/register", data);

      set({ user: res.data.user, registerLoading: false });
      toast.success("Registered successfully!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        set({ registerLoading: false, user: null });
        console.log(error);
      }
    }
  },
  login: async (data: User) => {
    set({ loginLoading: true });
    try {
      const res = await axios.post("/user/login", data);

      set({ user: res.data.user, loginLoading: false });
      toast.success("Logged in successfully!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ loginLoading: false });
        toast.error(error.response?.data.message);
      }
      console.log(error);
    }
  },
  logout: async () => {
    try {
      await axios.post("/user/logout");
      set({ user: null });
    } catch (error) {
      console.log(error);
    }
  },

  getCurrentUser: async () => {
    set({ checkAuth: true });
    try {
      const res = await axios.get("/user/me");

      set({ user: res.data, checkAuth: false });
    } catch (error) {
      console.log(error);
      set({ user: null, checkAuth: false });
    }
  },
}));
