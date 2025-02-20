import { z } from 'zod';
import { ApiResponseSchema } from './common';

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
export type EventSortKeys = '가까운 날짜순' | '낮은 금액순' | '가까운 거리순';
// 캘린더
export type DateRange = [Date | null, Date | null];

// Events
export interface EventStore {
  events: EventData[];
  setEvents: (event: EventData[]) => void;
}

// event-card
export interface EventCardData {
  eventImages: EventImages[];
  title: string;
  price: number;
  eventLocation?: EventLocation;
}
export interface EventCardProps {
  id: number;
  eventCardData: EventCardData;
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
  isMyLocationLoading: boolean;
  setIsMyLocationLoading: (isLoading: boolean) => void;
  myLocation: naver.maps.LatLng | null;
  hasMyLocationChanged: boolean;
  setMyLocation: (location: naver.maps.LatLng) => void;
  resetMyLocationChanged: () => void;
}

// MapBottomSheet
export interface MapBottomSheetProps {
  children: React.ReactNode;
}

// SearchBottomSheet
export interface SearchBottomSheetStore {
  isSearchBSOpen: boolean;
  setIsSearchBSOpen: (isOpen: boolean) => void;
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

// 이벤트 api 관련 타입
// zod 스키마 정의
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

export const CategoryIdSchema = z.nativeEnum(CategoryIdEnum);
const CategorySchema = z.object({
  name: z.string(),
  description: z.string(),
});
const locationGroupIdSchema = z.nativeEnum(LocationGroupIdEnum);

export const PriceTypeSchema = z.enum(['무료', '유료']);
export type PriceType = z.infer<typeof PriceTypeSchema>;

const EventImagesSchema = z.object({
  imageUrl: z.string().url(),
  sequence: z.number(),
});

export const EventScheduleRepeatTypeSchema = z.enum([
  'none',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'custom',
]);
export type EventScheduleRepeatType = z.infer<
  typeof EventScheduleRepeatTypeSchema
>;
export const EventSchedulesSchema = z.object({
  repeatType: EventScheduleRepeatTypeSchema,
  repeatEndDate: z.string().nullable(),
  isAllDay: z.boolean(),
  customText: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

const EventLocationSchema = z.object({
  coordinates: z.array(z.number()).nullable().optional(),
  address: z.string().nullable().optional(),
  buildingName: z.string().nullable().optional(),
});

export type EventLocation = z.infer<typeof EventLocationSchema>;

// 이벤트 생성 스키마
// 폼 스키마
export const EventCreateFormSchema = z.object({
  title: z.string().trim().min(1, '제목을 입력하세요.'),
  content: z
    .string()
    .trim()
    .min(1, '내용을 입력하세요.')
    .nullable() // null 허용
    .refine((val) => val !== '', {
      message: '내용을 입력하세요.',
    }),
  priceType: PriceTypeSchema,
  price: z.string(),
  categoryId: CategoryIdSchema,
  eventUrl: z
    .string()
    .min(1, '홈페이지 주소를 입력해주세요.')
    .url('올바른 URL 형식이 아닙니다.')
    .refine((val) => val !== null && val !== '', {
      message: '홈페이지 주소를 입력해주세요.',
    }),
  location: z.object({
    address: z
      .string()
      .min(1, '주소를 검색해 선택해주세요.')
      .refine((val) => val.includes('서울'), {
        message: '아직 서울 주소만 입력 가능해요',
      }),
    buildingName: z.string().min(1, '시설 이름을 입력해주세요.'),
  }),
  applicationStartDate: z.string().min(1, '시작 날짜를 입력하세요.'),
  applicationEndDate: z.string().min(1, '종료 날짜를 입력하세요.'),
  schedules: z.array(
    z
      .object({
        repeatType: EventScheduleRepeatTypeSchema,
        repeatEndDate: z.string().nullable(),
        isAllDay: z.boolean(),
        customText: z.string(),
        startDate: z.string().trim().min(1, '시작 날짜를 입력하세요.'),
        startTime: z.string().trim().min(1, '시작 시간을 입력하세요.'),
        endDate: z.string().trim().min(1, '종료 날짜를 입력하세요.'),
        endTime: z.string().trim().min(1, '종료 시간을 입력하세요.'),
      })
      .refine(
        (data) => {
          if (data.repeatType === 'custom') {
            return data.customText.trim().length > 0;
          }
          return true;
        },
        {
          message: '반복 설명을 입력하세요.',
          path: ['customText'],
        },
      ),
  ),
});

EventCreateFormSchema.superRefine((data, ctx) => {
  // 가격
  if (data.priceType === '유료') {
    if (isNaN(Number(data.price)) || Number(data.price) <= 0) {
      ctx.addIssue({
        path: ['price'],
        message: '양수를 입력해주세요.',
        code: 'invalid_literal',
        expected: '양수',
        received: data.price,
      });
    }
  }

  const applicationStartDate = new Date(data.applicationStartDate);
  const applicationEndDate = new Date(data.applicationEndDate);

  data.schedules.forEach((schedule, index) => {
    const startDate = new Date(schedule.startDate);
    const endDate = new Date(schedule.endDate);

    if (startDate < applicationStartDate || startDate > applicationEndDate) {
      console.log('startDate 범위 이상함');
      ctx.addIssue({
        path: [`schedules`, index, `startDate`],
        message: '스케줄 시작 날짜는 이벤트 기간 내로 입력해주세요.',
        code: 'invalid_date',
      });
    }

    if (endDate < applicationStartDate || endDate > applicationEndDate) {
      ctx.addIssue({
        path: [`schedules`, index, `endDate`],
        message: '스케줄 종료 날짜는 이벤트 기간 내로 입력해주세요.',
        code: 'invalid_date',
      });
    }

    if (startDate > endDate) {
      ctx.addIssue({
        path: [`schedules`, index, `endDate`],
        message: '스케줄 종료 날짜는 시작 날짜 이후여야 합니다.',
        code: 'invalid_date',
      });
    }
  });
});

export type EventCreateFormSchedule = z.infer<
  typeof EventCreateFormSchema
>['schedules'][0];
export type EventCreateFormValues = z.infer<typeof EventCreateFormSchema>;

// 데이터 스키마
export const EventCreateSchema = z.object({
  title: z.string(),
  content: z.string(),
  price: z.number(),
  categoryId: CategoryIdSchema,
  eventUrl: z.string(),
  applicationStart: z.string(),
  applicationEnd: z.string(),
  schedules: z.array(
    z.object({
      repeatType: EventScheduleRepeatTypeSchema,
      repeatEndDate: z.string().nullable(),
      isAllDay: z.boolean(),
      customText: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
  location: z.object({
    locationGroupId: locationGroupIdSchema,
    address: z.string(),
    buildingName: z.string(),
  }),
});

export type EventCreateData = z.infer<typeof EventCreateSchema>;

// ✅ 이벤트 수정
export const EventUpdateSchema = EventCreateSchema.extend({
  existingImageSequence: z.array(z.number()),
  newImageSequence: z.array(z.number()),
});
export type UpdateEventData = z.infer<typeof EventUpdateSchema>;

export const UpdateEventResponseSchema = ApiResponseSchema(
  z.object({
    message: z.string(),
  }),
);

export type UpdateEventResponse = z.infer<typeof UpdateEventResponseSchema>;

export interface UpdateEventParams {
  eventId: number;
  eventData: UpdateEventData;
  files?: File[];
}

// ✅ 이벤트 삭제
export const RemoveEventResponseSchema = ApiResponseSchema(
  z.object({
    message: z.string(),
  }),
);

export type RemoveEventResponse = z.infer<typeof RemoveEventResponseSchema>;

// ✅ 이벤트 조회
export const EventSchema = z.object({
  eventId: z.number(),
  title: z.string(),
  price: z.number(),
  categoryId: CategoryIdSchema,
  category: CategorySchema,
  createdUserId: z.number().nullable(),
  eventSchedules: z.array(EventSchedulesSchema),
  eventLocation: EventLocationSchema,
  eventImages: z.array(EventImagesSchema),
});

// 쿼리 키 타입
export type EventsQkType = [
  typeof GET_EVENTS_QK,
  {
    limit?: number;
    cursor?: number;
    categories?: string;
    locations?: string;
    price?: PriceOption;
    startDate?: string;
    endDate?: string;
    query?: string;
    lat?: number;
    lng?: number;
    southWest?: string;
    northEast?: string;
    sort?: EventSortKeys;
  },
];

// 훅 파람
export interface getEventsParams {
  limit?: number;
  cursor?: number;
  categories?: CategoryOptionWithoutAll[];
  locations?: LocationOptionWithoutAll[];
  price: PriceOption;
  startDate?: string;
  endDate?: string;
  query?: string;
  lat?: number;
  lng?: number;
  southWest?: string;
  northEast?: string;
  sort?: EventSortKeys;
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
  eventId: z.number(),
  title: z.string(),
  content: z.string().nullable(),
  price: z.number(),
  locationGroupId: locationGroupIdSchema.nullable(),
  eventUrl: z.string().url(),
  applicationStart: z.string().datetime(),
  applicationEnd: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  category: CategorySchema,
  eventLocation: EventLocationSchema,
  eventImages: z.array(EventImagesSchema),
  eventSchedules: z.array(EventSchedulesSchema),
  isScraped: z.boolean(),
});

// 데이터 타입 추출
export type EventDetailData = z.infer<typeof EventDetailSchema>;
export const EventDetailResponseSchema = ApiResponseSchema(
  z.object({
    event: EventDetailSchema,
  }),
);

// 쿼리 키 타입
export type EventDetailQkType = [
  typeof GET_EVENT_DETAIL_QK,
  string, // eventId - queryKey는 내부적으로 직렬화되니까
];

export type EventDetailResponse = z.infer<typeof EventDetailResponseSchema>;

// ✅ 이벤트 스크랩 조회
export const EventSchemaFromScrap = z.object({
  eventScrapId: z.number(),
  eventId: z.number(),
  event: z.object({
    title: z.string(),
    content: z.string().nullable(),
    price: z.number(),
    categoryId: CategoryIdSchema,
    category: CategorySchema,
    locationGroupId: locationGroupIdSchema.nullable(),
    eventUrl: z.string().url(),
    applicationStart: z.string().datetime(),
    applicationEnd: z.string().datetime(),
    eventImages: z.array(EventImagesSchema),
    eventSchedules: z.array(EventSchedulesSchema),
  }),
});

export type EventDataFromScrap = z.infer<typeof EventSchemaFromScrap>;

export const GetEventsScrappedResponseSchema = ApiResponseSchema(
  z.object({
    events: z.array(EventSchemaFromScrap),
    hasNextPage: z.boolean(),
    nextCursor: z.number().optional().nullable(),
  }),
);

export interface getEventsScrappedParams {
  limit?: number;
  cursor?: number;
  categories?: CategoryOptionWithoutAll[];
}

export type EventsScrappedQKType = [
  typeof GET_EVENTS_SCRAPPED_QK,
  number, // limit
  number | undefined, // cursor
  string | undefined, // categories
];

export type EventsScrappedResponse = z.infer<
  typeof GetEventsScrappedResponseSchema
>;

// ✅ 이벤트 스크랩, 취소
export const ToggleScrapEventResponseSchema = ApiResponseSchema(
  z.object({
    message: z.string(),
  }),
);

export type ToggleScrapEventResponse = z.infer<
  typeof ToggleScrapEventResponseSchema
>;

export interface ToggleScrapEventParams {
  eventId: number;
  isScraped: boolean;
}

// ✅ 이벤트 생성
export const CreateEventResponseSchema = ApiResponseSchema(
  z.object({
    message: z.string(),
  }),
);

export type CreateEventResponse = z.infer<typeof CreateEventResponseSchema>;

export interface CreateEventParams {
  eventData: EventCreateData;
  files?: File[];
}
