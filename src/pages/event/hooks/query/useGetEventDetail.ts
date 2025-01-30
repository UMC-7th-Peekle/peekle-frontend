// import { useSuspenseQuery } from '@tanstack/react-query';
// import { client } from '@/apis/client';
// import {
//   EventDetailResponseSchema,
//   EventDetailResponse,
//   EventDetailQkType,
// } from '../../types';

// // API 호출 함수
// const getEventDetail = async (
//   eventId: string,
// ): Promise<EventDetailResponse> => {
//   const response = await client<EventDetailResponse>({
//     method: 'GET',
//     url: `/community/1/articles/${eventId}`,
//   });

//   // 응답 데이터 검증
//   const parsedData = EventDetailResponseSchema.parse(response.data);
//   return parsedData;
// };

// // useQuery 훅
// export const useGetEventDetail = ({ eventId }: { eventId: string }) => {
//   return useSuspenseQuery<
//     EventDetailResponse,
//     Error,
//     EventDetailResponse,
//     EventDetailQkType
//   >({
//     queryKey: ['event-detail', eventId],
//     queryFn: () => getEventDetail(eventId),
//   });
// };
