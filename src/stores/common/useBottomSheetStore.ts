import { create } from 'zustand';
import { BottomSheetStore } from '@/types/common';

const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  isBottomSheetOpen: false,
  activeTab: 'sort',
  setIsBottomSheetOpen: (isBottomSheetOpen: boolean) =>
    set({ isBottomSheetOpen }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useBottomSheetStore;
