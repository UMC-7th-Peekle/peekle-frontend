import {
  CATEGORY_OPTIONS,
  DURATION_OPTIONS,
  PRICE_OPTIONS,
  LOCATION_OPTIONS,
} from '@/constants/event';

// FilterChip
export interface FilterChipProps {
  option: string;
  defaultValue: string;
  defaultLabel: string;
}

// FilterChips
export type FilterChipsOption = 'category' | 'duration' | 'price' | 'location';

export type CategoryValue = (typeof CATEGORY_OPTIONS)[number][1];
export type DurationValue = (typeof DURATION_OPTIONS)[number][1];
export type PriceValue = (typeof PRICE_OPTIONS)[number][1];
export type LocationValue = (typeof LOCATION_OPTIONS)[number][1];

// FilterTabs
// 내부 상태
export interface FilterTabsStoreForChildren {
  selectedValue: string; // 내부 식별자
  setSelectedValue: (value: string) => void;
  option: string; // tab 종류 - 접근성용 e.g.이벤트 필터 탭
  setOption: (value: string) => void;
}

export interface FilterTabsProps {
  option: string;
  defaultValue: string;
  children: React.ReactNode;
}

export interface FilterTabsTriggerProps {
  value: string;
  label: string; // ui에 표시할 값
  onClick?: () => void;
}

export interface FilterTabsPanelProps {
  value: string;
  children: React.ReactNode;
}

export interface FilterTabsListProps {
  children: React.ReactElement<FilterTabsTriggerProps>[];
}

// 전역 상태
export interface FilterTabsStore {
  activeTab: string; // 어떤 탭 활성화 할건지
  setActiveTab: (tab: string) => void;
}

export type EventFilterKeys =
  | 'sort'
  | 'category'
  | 'duration'
  | 'price'
  | 'location';

// 데이터
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
export type EventFilterType = 'single' | 'multiple';

export interface UseEventFilterProps {
  key?: EventFilterKeys;
  type?: EventFilterType;
}

// Map
export type MapInstance = naver.maps.Map;

export interface MapStore {
  selectedEvent: EventData | null;
  setSelectedEvent: (event: EventData) => void;
}

export interface LocationConfirmProps {
  onLocationAllow: () => void;
}

export interface MyLocationStore {
  myLocation: naver.maps.LatLng | null;
  setMyLocation: (location: naver.maps.LatLng) => void;
}

// MapBottomSheet
export interface MapBottomSheetProps {
  children: React.ReactNode;
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
