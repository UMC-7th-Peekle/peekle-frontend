import { create } from 'zustand';
import { ToastStore } from '@/types/common';

const useToastStore = create<ToastStore>((set) => ({
  isOpen: false,
  message: '',
  isFadingOut: false, // 애니메이션 상태
  show: (message: string) => {
    set({ isOpen: true, message, isFadingOut: false });
    setTimeout(() => set({ isFadingOut: true }), 2000); // 2초 후 fadeout 시작
    setTimeout(() => set({ isOpen: false, isFadingOut: false }), 2500); // 2.5초 후 toast 숨김
  },
  close: () => set({ isOpen: false, message: '', isFadingOut: false }),
}));

export default useToastStore;
