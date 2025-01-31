import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FilteredEventStore } from '@/types/event';

const useFilteredEventStore = create<FilteredEventStore>()(
  persist(
    (set) => ({
      filteredEvent: [],
      setFilteredEvent: (event) => set({ filteredEvent: event }),
    }),
    {
      name: 'filtered-event-storage',
    },
  ),
);

export default useFilteredEventStore;
