import { create } from 'zustand';
import { NavbarStore } from '@/types/layout';

export const useNavbarStore = create<NavbarStore>((set) => ({
  shouldShowNavbar: false,
  setShouldShowNavbar: (shouldShowNavbar: boolean) => set({ shouldShowNavbar }),
}));
