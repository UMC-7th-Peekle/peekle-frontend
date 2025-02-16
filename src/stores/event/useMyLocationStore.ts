import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MyLocationStore } from '@/types/event';

const useMyLocationStore = create<MyLocationStore>()(
  persist(
    (set) => ({
      myLocation: null,
      hasMyLocationChanged: true,
      setMyLocation: (location) =>
        set((state) => ({
          myLocation: location,
          hasMyLocationChanged: location !== state.myLocation,
        })),
      resetMyLocationChanged: () => set({ hasMyLocationChanged: false }),
    }),
    {
      name: 'my-location-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useMyLocationStore;
