import { ReactNode } from 'react';

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

export type DateRange = [Date | null, Date | null];

// filteredEvent
export interface FilteredEventStore {
  filteredEvent: EventData[];
  setFilteredEvent: (event: EventData[]) => void;
}

// event-card
export interface EventCardProps {
  id: string;
  onClick?: () => void;
}

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

// ImageSlider
export interface ImageSliderProps {
  images: string[];
  title: string; // 접근성용
}

// FilePagination
export interface FilePaginationProps {
  fileLength: number;
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

// MapBottomSheet
export interface MapBottomSheetProps {
  children: ReactNode;
}
