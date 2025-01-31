import { create } from 'zustand';
import { MapStore } from '@/types/event';

const useMapStore = create<MapStore>((set) => ({
  selectedEvent: null,
  setSelectedEvent: (event) => set({ selectedEvent: event }),
}));

export default useMapStore;
