export interface EventCardProps {
  category: string;
  date: string;
  time: string;
  location: string;
  center: string;
  price: string;
  images: string[];
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export type DateRange = [Date | null, Date | null];

// event-filter
type FilterType = 'single' | 'multiple';

export interface UseEventFilterProps {
  key?: string;
  type?: FilterType;
}
