import { z, ZodSchema } from 'zod';
import {
  CATEGORY_OPTIONS,
  CATEGORY_OPTIONS_WITHOUT_ALL,
  PRICE_OPTIONS,
  PRICE_OPTIONS_WITHOUT_ALL,
  LOCATION_OPTIONS,
  LOCATION_OPTIONS_WITHOUT_ALL,
} from '@/constants/event';
import { getDistrict } from '@/utils/eventFormatter';

// CheckItem
export interface CheckItemProps {
  text: string;
  onClick: () => void;
  isActive: boolean;
}

// FilterTabs
// 내부 상태
export interface FilterTabsStore {
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

export type EventFilterKeys = '정렬' | '카테고리' | '기간' | '가격' | '지역';

// 캘린더
export type DateRange = [Date | null, Date | null];

// filteredEvent
export interface FilteredEventStore {
  filteredEvent: EventData[];
  setFilteredEvent: (event: EventData[]) => void;
}

// event-card
export interface EventCardProps {
  id: bigint;
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
  setSelectedEvent: (event: EventData | null) => void;
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
  images: EventImages[];
  title: string; // 접근성용
}

// FilePagination
export interface FilePaginationProps {
  fileLength: number;
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

// 데이터
// 이벤트 필터링
// zod 스키마 정의
export enum LocationCodeEnum {
  마포_서대문_은평 = 19,
  강서_금천_양천 = 20,
  광진_성동_중랑_동대문 = 21,
  강남_서초_양재 = 22,
  동작_관악_사당 = 23,
  종로_중구_용산 = 24,
  영등포_구로_신도림 = 25,
}

export type CategoryOption = (typeof CATEGORY_OPTIONS)[number]; // '전체' | '교육' | '문화' | '활동'
export type CategoryOptionWithoutAll =
  (typeof CATEGORY_OPTIONS_WITHOUT_ALL)[number];
export type PriceOption = (typeof PRICE_OPTIONS)[number]; // '전체' | '무료' | '유료'
export type PriceOptionWithoutAll = (typeof PRICE_OPTIONS_WITHOUT_ALL)[number];
export type LocationOption = (typeof LOCATION_OPTIONS)[number][1] extends string
  ? number
  : never; // 0~25
export type LocationOptionWithoutAll =
  (typeof LOCATION_OPTIONS_WITHOUT_ALL)[number][1] extends string
    ? number
    : never;

const locationCodeSchema = z.nativeEnum(LocationCodeEnum);

const EventCategorySchema = z.object({
  name: z.enum(CATEGORY_OPTIONS_WITHOUT_ALL),
  description: z.string(),
});

const EventImagesSchema = z.object({
  imageUrl: z.string().url(),
  sequence: z.number(),
});

const EventSchedulesSchema = z.object({
  repeatType: z.enum([
    'none',
    'daily',
    'weekly',
    'monthly',
    'yearly',
    'custom',
  ]),
  repeatEndDate: z.string().nullable(),
  isAllDay: z.boolean(),
  customText: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date(),
  startTime: z.string(),
  endTime: z.string(),
});

export const EventSchema = z.object({
  eventId: z.bigint(),
  title: z.string(),
  content: z.string(),
  price: z.number(),
  location: z.string().transform(getDistrict),
  locationGroupId: locationCodeSchema,
  eventUrl: z.string().url(),
  applicationStart: z.string().datetime(),
  applicationEnd: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  category: EventCategorySchema,
  latitude: z.number(),
  longitude: z.number(),
  center: z.string(),
  datailAddress: z.string(),
  eventImages: z.array(EventImagesSchema),
  eventSchedules: z.array(EventSchedulesSchema),
});

// 쿼리 키 타입
export type EventsQkType = [
  'events',
  number,
  number | undefined,
  CategoryOption,
  LocationOption,
  PriceOption,
  string | undefined,
  string | undefined,
  string | undefined,
];

// 훅 파람
export interface getEventsParams {
  limit: number;
  cursor?: number;
  category: CategoryOption;
  location: LocationOption;
  price: PriceOption;
  startDate?: string;
  endDate?: string;
  query?: string;
}

// 데이터 타입 추출
export type EventImages = z.infer<typeof EventImagesSchema>;
export type EventSchedule = z.infer<typeof EventSchedulesSchema>;
export type EventData = z.infer<typeof EventSchema>;

const SuccessEventsReponeseSchema = z.object({
  events: z.array(EventSchema),
  nextCursor: z.number().nullable(),
  hasNextPage: z.boolean(),
});

// 전체 응답 스키마
export const ApiResponseSchema = <T>(SuccessType: ZodSchema<T>) =>
  z.object({
    resultType: z.enum(['SUCCESS', 'FAIL']),
    error: z
      .object({
        errorCode: z.string(),
        reason: z.string(),
        data: z.unknown().nullable(),
      })
      .nullable(),
    success: z.union([z.null(), SuccessType]), // T가 실제로 여기에서 사용됩니다.
  });
export type ApiResponse<T> = z.infer<ReturnType<typeof ApiResponseSchema<T>>>;

export const EventsResponseSchema = ApiResponseSchema(
  SuccessEventsReponeseSchema,
);

export type EventsResponse = z.infer<typeof EventsResponseSchema>;

// 이벤트 스크랩
export const ScrapResponseSchema = ApiResponseSchema(
  z.object({
    message: z.string(),
  }),
);

export type ScrapResponse = z.infer<typeof ScrapResponseSchema>;

// 이벤트 스크랩 조회

// 이벤트 스크랩 취소
export const DeleteScrapResponseSchema = ApiResponseSchema(
  z.object({
    message: z.string(),
  }),
);

export type DeleteScrapResponse = z.infer<typeof DeleteScrapResponseSchema>;
