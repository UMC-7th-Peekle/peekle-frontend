import { z } from 'zod';

// 이벤트 필터링
// zod 스키마 정의
// enum CategoryCodeEnum {
//   교육 = 1,
//   문화 = 2,
//   활동 = 5,
// }

enum LocationCodeEnum {
  마포_서대문_은평 = 19,
  강서_금천_양천 = 20,
  광진_성동_중랑_동대문 = 21,
  강남_서초_양재 = 22,
  동작_관악_사당 = 23,
  종로_중구_용산 = 24,
  영등포_구로_신도림 = 25,
}

// const categoryCodeSchema = z.nativeEnum(CategoryCodeEnum);
const locationCodeSchema = z.nativeEnum(LocationCodeEnum);

const EventCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
});

const EventImagesSchema = z.object({
  imageUrl: z.string().url(),
  sequence: z.number(),
});

const EventSchedulesSchema = z.object({
  repeatType: z.string(), //ㅗㅗㅗ
  repeatEndDate: z.string().nullable(),
  isAllDay: z.boolean(),
  customText: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date(),
  startTime: z.string(),
  endTime: z.string(),
});

export const EventSchema = z.object({
  eventId: z.number(),
  title: z.string(),
  content: z.string(),
  price: z.number(),
  location: z.string(),
  locationGroupId: locationCodeSchema,
  eventUrl: z.string().url(),
  applicationStart: z.string().datetime(),
  applicationEnd: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  category: EventCategorySchema,
  eventImages: z.array(EventImagesSchema),
  eventSchedules: z.array(EventSchedulesSchema),
});

export const SuccessEventReponeseSchema = z.object({
  events: z.array(EventSchema),
  nextCursor: z.number().nullable(),
  hasNextPage: z.boolean(),
});

export const EventsResponseSchema = z.object({
  resultType: z.literal('SUCCESS'),
  error: z.null(),
  success: SuccessEventReponeseSchema,
});

// 데이터 타입 추출
export type EventsResponse = z.infer<typeof EventsResponseSchema>;
export type event = z.infer<typeof EventSchema>;

// 쿼리 키 타입
export type EventsQkType = ['events'];

// 이벤트 디테일
export const EventDetailSchema = z.object({
  eventId: z.number(),
  title: z.string(),
  content: z.string(),
  price: z.number(),
  location: z.string(),
  locationGroupId: locationCodeSchema,
  eventUrl: z.string().url(),
  applicationStart: z.string().datetime(),
  applicationEnd: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  category: EventCategorySchema,
  eventImages: z.array(EventImagesSchema),
  eventSchedules: z.array(EventSchedulesSchema),
});

// 성공 응답 스키마
export const SuccessEventDetailResponseSchema = z.object({
  event: EventDetailSchema,
});

// 전체 응답 스키마
export const EventDetailResponseSchema = z.object({
  resultType: z.literal('SUCCESS'),
  error: z.null(),
  success: SuccessEventDetailResponseSchema,
});

// 데이터 타입 추출
export type EventDetailResponse = z.infer<typeof EventDetailResponseSchema>;

// 쿼리 키 타입
export type EventDetailQkType = ['event-detail', string];
