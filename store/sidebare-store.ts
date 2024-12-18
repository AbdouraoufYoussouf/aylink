import { create } from 'zustand';

interface SidebarStore {
  isMinimized: boolean;
  toggle: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isMinimized: false,
  toggle: () => set((state) => ({ isMinimized: !state.isMinimized }))
}));
