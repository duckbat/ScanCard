import { LoginForm, RegisterForm } from "@/types/auth.types";
import axios from "axios";
import { create } from "zustand";

type AuthState = {
  user: null | { username: string; email: string };
  loading: boolean;
  error: string | null;
  login: (credentials: LoginForm) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => void;
};

const getStoredUser = () => {
  const userItem = localStorage.getItem("user");
  
  // First check if the value is null or "undefined" string
  if (!userItem || userItem === "undefined") {
    return null;
  }
  
  try {
    return JSON.parse(userItem);
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    localStorage.removeItem("user");
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  // Initialize user state from localStorage
  user: getStoredUser(),
  loading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({ loading: true, error: null });
      
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        credentials
      );

      // Store valid user data
      const userData = data.user || { username: data.username, email: data.email };
      
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      set({ user: userData, loading: false });
    } catch (error) {
      set({ error: "Login failed", loading: false });
      throw error;
    }
  },

  register: async (userData) => {
    try {
      set({ loading: true, error: null });
      
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        userData
      );

      // Store valid user data
      const registeredUser = data.user || { username: userData.username, email: userData.email };
      
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("user", JSON.stringify(registeredUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      set({ user: registeredUser, loading: false });
    } catch (error) {
      set({ error: "Registration failed", loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    set({ user: null });
  }
}));

// Initialize axios headers
const token = localStorage.getItem("accessToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}