import { create } from 'zustand';
import { MyLocationStore } from '@/types/event';

const useMyLocationStore = create<MyLocationStore>((set) => ({
  myLocation: null,
  setMyLocation: (location) => set({ myLocation: location }),
}));

export default useMyLocationStore;
