import { z, ZodSchema } from 'zod';
import {
  CATEGORY_OPTIONS,
  CATEGORY_OPTIONS_WITHOUT_ALL,
  PRICE_OPTIONS,
  PRICE_OPTIONS_WITHOUT_ALL,
  LOCATION_OPTIONS,
  LOCATION_OPTIONS_WITHOUT_ALL,
  // 쿼리키들
  GET_EVENTS_QK,
  GET_EVENT_DETAIL_QK,
  GET_EVENTS_SCRAPPED_QK,
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
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
  latestPos: naver.maps.LatLng | null;
  setLatestPos: (pos: naver.maps.LatLng) => void;
}

export interface LocationConfirmProps {
  onLocationAllow: () => void;
  onLocationDeny: () => void;
}

export interface MyLocationStore {
  myLocation: naver.maps.LatLng | null;
  hasMyLocationChanged: boolean;
  setMyLocation: (location: naver.maps.LatLng) => void;
  resetMyLocationChanged: () => void;
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

// 이벤트 필터링
// zod 스키마 정의

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
    success: z.union([SuccessType, z.null()]),
  });
export type ApiResponse<T> = z.infer<ReturnType<typeof ApiResponseSchema<T>>>;

// ✅ 이벤트 조회
export enum CategoryIdEnum {
  교육 = 1,
  문화 = 2,
  활동 = 3,
  기타 = 4,
}

export enum LocationGroupIdEnum {
  잠실_송파_강동 = 1,
  마포_서대문_은평 = 2,
  강서_금천_양천 = 3,
  광진_성동_중랑_동대문 = 4,
  강남_서초_양재 = 5,
  동작_관악_사당 = 6,
  종로_중구_용산 = 7,
  영등포_구로_신도림 = 8,
}

export type CategoryOption = (typeof CATEGORY_OPTIONS)[number][1] extends string
  ? number
  : never; // 0 ~ 4
export type CategoryOptionWithoutAll =
  (typeof CATEGORY_OPTIONS_WITHOUT_ALL)[number][1] extends string
    ? number
    : never;
export type PriceOption = (typeof PRICE_OPTIONS)[number]; // '전체' | '무료' | '유료'
export type PriceOptionWithoutAll = (typeof PRICE_OPTIONS_WITHOUT_ALL)[number];
export type LocationOption = (typeof LOCATION_OPTIONS)[number][1] extends string
  ? number
  : never; // 0 ~ 8
export type LocationOptionWithoutAll =
  (typeof LOCATION_OPTIONS_WITHOUT_ALL)[number][1] extends string
    ? number
    : never;

const CategoryIdSchema = z.nativeEnum(CategoryIdEnum);
const CategorySchema = z.object({
  name: z.string(),
  description: z.string(),
});
const locationGroupIdSchema = z.nativeEnum(LocationGroupIdEnum).nullable();

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
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

const EventLocationSchema = z.object({
  coordinates: z.array(z.number()),
  locationGroupId: locationGroupIdSchema,
  roadAddress: z.string().nullable(),
  jibunAddress: z.string().nullable(),
  buildingCode: z.string().nullable(),
  buildingName: z.string().nullable(),
  sido: z.string().nullable(),
  sigungu: z.string().nullable(),
  sigunguCode: z.string().nullable(),
  roadnameCode: z.string().nullable(),
  zoneCode: z.string().nullable(),
  detail: z.string().nullable(),
});

export const EventSchema = z.object({
  eventId: z.bigint(),
  title: z.string(),
  price: z.number(),
  categoryId: CategoryIdSchema,
  category: CategorySchema,
  createdUserId: z.bigint().nullable(),
  eventImages: z.array(EventImagesSchema),
  eventSchedules: z.array(EventSchedulesSchema),
  eventLocation: EventLocationSchema,
});

// 쿼리 키 타입
export type EventsQkType = [
  typeof GET_EVENTS_QK,
  number, // limit
  number | undefined, // cursor
  CategoryOptionWithoutAll[] | undefined,
  LocationOptionWithoutAll[] | undefined,
  PriceOption,
  string | undefined, // startDate
  string | undefined, // endDate
  string | undefined, // query
];

// 훅 파람
export interface getEventsParams {
  limit: number;
  cursor?: number;
  categories?: CategoryOptionWithoutAll[];
  locations?: LocationOptionWithoutAll[];
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
  nextCursor: z.number().optional().nullable(),
  hasNextPage: z.boolean(),
});

export const EventsResponseSchema = ApiResponseSchema(
  SuccessEventsReponeseSchema,
);

export type EventsResponse = z.infer<typeof EventsResponseSchema>;

// ✅ 이벤트 디테일
export const EventDetailSchema = z.object({
  eventId: z.bigint(),
  title: z.string(),
  content: z.string(),
  price: z.number(),
  location: z.string().transform(getDistrict),
  locationGroupId: locationGroupIdSchema,
  eventUrl: z.string().url(),
  applicationStart: z.string().datetime(),
  applicationEnd: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  placeName: z.string(),
  datailAddress: z.string(),
  eventImages: z.array(EventImagesSchema),
  eventSchedules: z.array(EventSchedulesSchema),
});

// 데이터 타입 추출
export type EventDetailData = z.infer<typeof EventDetailSchema>;

const SuccessEventDetailReponeseSchema = z.object({
  events: z.array(EventSchema),
  nextCursor: z.number().optional().nullable(),
  hasNextPage: z.boolean(),
});

export const EventDetailResponseSchema = ApiResponseSchema(
  SuccessEventDetailReponeseSchema,
);

// 쿼리 키 타입
export type EventDetailQkType = [
  typeof GET_EVENT_DETAIL_QK,
  bigint, // eventId
];

export type EventDetailResponse = z.infer<typeof EventDetailResponseSchema>;

// ✅ 이벤트 스크랩 조회
export const GetEventsScrappedResponseSchema = ApiResponseSchema(
  z.object({
    events: z.array(EventSchema),
  }),
);

const SuccessEventsScrappedReponeseSchema = z.object({
  events: z.array(EventSchema),
  nextCursor: z.number().optional().nullable(),
  hasNextPage: z.boolean(),
});

export const EventsScrappedResponseSchema = ApiResponseSchema(
  SuccessEventsScrappedReponeseSchema,
);

export interface getEventsScrappedParams {
  limit: number;
  cursor?: number;
  categories?: CategoryOptionWithoutAll[];
}

export type EventsScrappedQKType = [
  typeof GET_EVENTS_SCRAPPED_QK,
  number, // limit
  number | undefined, // cursor
  CategoryOptionWithoutAll[] | undefined, // categories
];

export type EventsScrappedResponse = z.infer<
  typeof EventsScrappedResponseSchema
>;

// ✅ 이벤트 스크랩
export const ScrapResponseSchema = ApiResponseSchema(
  z.object({
    message: z.string(),
  }),
);

export type ScrapResponse = z.infer<typeof DeleteScrapResponseSchema>;

// ✅ 이벤트 스크랩 취소
export const DeleteScrapResponseSchema = ApiResponseSchema(
  z.object({
    message: z.string(),
  }),
);

export type DeleteScrapResponse = z.infer<typeof DeleteScrapResponseSchema>;

// 네이버 지도
// 클러스터링
type Icon = {
  content: string;
  anchor: naver.maps.Point;
};
export interface MarkerClusteringOptions {
  map: naver.maps.Map | null;
  markers: naver.maps.Marker[];
  disableClickZoom: boolean;
  minClusterSize: number;
  maxZoom: number;
  gridSize: number;
  icons: Icon[];
  indexGenerator: number[];
  averageCenter: boolean;
  stylingFunction: (clusterMarker: naver.maps.Marker, count: number) => void;
}
