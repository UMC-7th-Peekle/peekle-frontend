import { create } from 'zustand';
import { SearchBottomSheetStore } from '@/types/event';

const useSearchBottomSheetStore = create<SearchBottomSheetStore>((set) => ({
  isSearchBSOpen: true,
  setIsSearchBSOpen: (isSearchBSOpen: boolean) => set({ isSearchBSOpen }),
}));

export default useSearchBottomSheetStore;
