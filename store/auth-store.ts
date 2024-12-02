import { create } from "zustand";

interface Token {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthStoreType {
  isAuth: boolean;
  isCalendarConnect: boolean;
  token: Token | null;
  setAuth: (isAuth: boolean) => void;
  setCalendarConnect: (isCalendarConnect: boolean) => void;
  setToken: (token: Token) => void;
}

export const useAuthStore = create<AuthStoreType>((set) => ({
  isAuth: false,
  isCalendarConnect: false,
  token: null, // Initialisation du token
  setAuth: (isAuth: boolean) => set({ isAuth }),
  setCalendarConnect: (isCalendarConnect: boolean) => set({ isCalendarConnect }),
  setToken: (token: Token) => set({ token }), // Ajout de la fonction setToken
}));
