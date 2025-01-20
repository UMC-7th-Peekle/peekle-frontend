import { create } from 'zustand';
import { TabStore } from '@/types/common';

const useTabsStore = create<TabStore>((set) => ({
  activeTab: 'sort',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useTabsStore;
