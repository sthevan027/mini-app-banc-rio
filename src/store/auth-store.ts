import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserSession } from "./types";

type AuthState = {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (user: UserSession) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "banc-rio-auth",
    },
  ),
);
