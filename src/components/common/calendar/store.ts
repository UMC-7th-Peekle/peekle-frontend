import { create } from 'zustand';

interface DateStore {
  startDay: Date | null;
  endDay: Date | null;
  setStartDay: (date: Date | null) => void;
  setEndDay: (date: Date | null) => void;
  resetDays: () => void;
}

export const useDateStore = create<DateStore>((set) => ({
  startDay: null,
  endDay: null,
  setStartDay: (date) => set({ startDay: date }),
  setEndDay: (date) => set({ endDay: date }),
  resetDays: () => set({ startDay: null, endDay: null }),
}));

// 시작 날짜, 끝 날짜를 리턴하는 함수
export const useDateRange = () => {
  const { startDay, endDay } = useDateStore();
  return { startDay, endDay };
};
