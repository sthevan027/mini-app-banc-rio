import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserSession } from "../entities/auth/types";

type AuthState = {
  user: UserSession | null;
  hasHydrated: boolean;
  login: (user: UserSession) => void;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "banc-rio-auth",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
