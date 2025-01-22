import { create } from 'zustand';
import { FilterTabsStoreForChildren } from '@/types/event';

const useFilterTabsStore = create<FilterTabsStoreForChildren>((set) => ({
  selectedValue: '',
  setSelectedValue: (value: string) => set({ selectedValue: value }),
  option: '',
  setOption: (value: string) => set({ option: value }),
}));

export default useFilterTabsStore;
