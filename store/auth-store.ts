import { create } from "zustand";

interface Token {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthStoreType {
  isAuth: boolean;

  token: Token | null;
  setAuth: (isAuth: boolean) => void;
  setToken: (token: Token) => void;
}

export const useAuthStore = create<AuthStoreType>((set) => ({
  isAuth: false,

  token: null, // Initialisation du token
  setAuth: (isAuth: boolean) => set({ isAuth }),
  setToken: (token: Token) => set({ token }), // Ajout de la fonction setToken
}));
