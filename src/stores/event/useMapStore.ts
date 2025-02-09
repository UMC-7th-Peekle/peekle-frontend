import { create } from 'zustand';
import { MapStore } from '@/types/event';

const useMapStore = create<MapStore>((set) => ({
  selectedEvent: null,
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  loadingMessage: '',
  setLoadingMessage: (message) => set({ loadingMessage: message }),
  latestPos: null,
  setLatestPos: (pos) => set({ latestPos: pos }),
}));

export default useMapStore;
