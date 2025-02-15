import { create } from 'zustand';
import { EventStore, EventData } from '@/types/event';

const useEventsStore = create<EventStore>((set) => ({
  events: [],
  setEvents: (events: EventData[]) => set({ events }),
}));

export default useEventsStore;
