import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MyLocationStore } from '@/types/event';

const useMyLocationStore = create<MyLocationStore>()(
  persist(
    (set) => ({
      myLocation: null,
      setMyLocation: (location) => set({ myLocation: location }),
    }),
    {
      name: 'my-location-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useMyLocationStore;
