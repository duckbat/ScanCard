import { User } from "@/types/user.types";
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
      const response = await axios.get<User[]>(
        `${import.meta.env.VITE_API_URL}/api/users`
      );
      const users = response.data;
      console.log("Fetched users:", users);
      set({ users, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch users", loading: false });
      console.log("Error fetching users", error);
    }
  },

  addUser: async (user: User) => {
    try {
      set({ loading: true, error: null });
      // Updated to match direct response format
      const response = await axios.post<User>(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        user
      );
      const newUser = response.data;
      console.log("Added user:", newUser);
      set((state) => ({
        users: [...state.users, newUser],
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
      // Updated to match direct response format
      const response = await axios.put<User>(
        `${import.meta.env.VITE_API_URL}/api/users/${id}`,
        user
      );
      const updatedUser = response.data;
      console.log("Updated user:", updatedUser);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update user", loading: false });
      console.error("Error updating user", error);
    }
  },

  deleteUser: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
      console.log("Deleted user with ID:", id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete user", loading: false });
      console.error("Error deleting user", error);
    }
  },
}));
