import { create } from 'zustand';
import { BottomSheetStore } from '@/types/common';

const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  activeBottomSheet: null, // 처음엔 아무 BottomSheet도 열려 있지 않음
  setActiveBottomSheet: (sheet) => set({ activeBottomSheet: sheet }), // BottomSheet를 하나만 활성화
  bottomSheetHeight: 'auto',
  setBottomSheetHeight: (height) => set({ bottomSheetHeight: height }),
}));

export default useBottomSheetStore;
