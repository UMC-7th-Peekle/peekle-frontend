import { create } from 'zustand';
import { FilterTabsStore } from '@/types/event';

const useFilterTabsStore = create<FilterTabsStore>((set) => ({
  activeTab: 'sort',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useFilterTabsStore;
