import { create } from 'zustand';
import { BottomSheetStore } from '@/types/common';

const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  isBottomSheetOpen: false,
  setIsBottomSheetOpen: (isBottomSheetOpen: boolean) =>
    set({ isBottomSheetOpen }),
}));

export default useBottomSheetStore;
