import { create } from 'zustand';
import { FilteredEventStore } from '@/types/event';

const useFilteredEventStore = create<FilteredEventStore>((set) => ({
  filteredEvent: [],
  setFilteredEvent: (event) => set({ filteredEvent: event }),
}));

export default useFilteredEventStore;
