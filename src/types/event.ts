export interface EventData {
  id: string;
  category: string;
  StartDateTime: string;
  time: string;
  location: string;
  center: string;
  latitude: number;
  longitude: number;
  price: string;
  images: string[];
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
export interface EventCardProps {
  id: string;
}

export interface FilteredEventStore {
  filteredEvent: EventData[];
  setFilteredEvent: (event: EventData[]) => void;
}

export type DateRange = [Date | null, Date | null];

// event-filter
type FilterType = 'single' | 'multiple';

export interface UseEventFilterProps {
  key?: string;
  type?: FilterType;
}

// Map
export interface LocationConfirmProps {
  onLocationAllow: () => void;
}

export interface MyLocation {
  latitude: number;
  longitude: number;
}

export interface MyLocationStore {
  myLocation: MyLocation | null;
  setMyLocation: (location: MyLocation) => void;
}
