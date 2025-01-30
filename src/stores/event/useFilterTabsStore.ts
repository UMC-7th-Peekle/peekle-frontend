import { create } from 'zustand';
import { FilterTabsStore } from '@/types/event';

const useFilterTabsStore = create<FilterTabsStore>((set) => ({
  selectedValue: '',
  setSelectedValue: (value: string) => set({ selectedValue: value }),
  option: '',
  setOption: (value: string) => set({ option: value }),
}));

export default useFilterTabsStore;
