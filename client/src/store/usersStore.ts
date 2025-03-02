import { User, UserResponse } from "@/types/user.types";
import axios from "axios";
import { create } from "zustand";

type UserStore = {
  users: User[];
  loading: boolean;
  error: string | null;
    fetchUsers: () => Promise<void>;
    addUser: (user: User) => Promise<void>;
    updateUser: (id: string, user: User) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
};

export const useUsersStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await axios.get<UserResponse>(
        `${process.env.VITE_API_URL}/api/users`
      );
      set({ users: data.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch users", loading: false });
      console.log("Error fetching users", error);
    }
  },

  addUser: async (user: User) => {
    try {
      set({ loading: true, error: null });
      const { data } = await axios.post<{ data: User }>(
        `${process.env.VITE_API_URL}/api/auth/register`,
        user
      );
      set((state) => ({
        users: [...state.users, data.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to add user", loading: false });
      console.error("Error adding user", error);
    }
  },

  updateUser: async (id: string, user: User) => {
    try {
      set({ loading: true, error: null });
      const { data } = await axios.put<{ data: User }>(
        `${process.env.VITE_API_URL}/api/users/${id}`,
        user
      );
      set((state) => ({
        users: state.users.map((c) => (c.id === id ? data.data : c)),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to upate user", loading: false });
      console.error("Error updating user", error);
    }
  },

  deleteUser: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await axios.delete(`${process.env.VITE_ENV_URL}/api/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: true,
      }));
    } catch (error) {
      set({ error: "Failed to delete user", loading: false });
      console.error("Error deleting user", error);
    }
  },
}));
