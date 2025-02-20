// import { useSuspenseQuery } from '@tanstack/react-query';
// import { client } from '@/apis/client';
// import {
//   // EventDetailSchema,
//   EventDetailResponse,
//   EventDetailQkType,
// } from '@/types/event';
// import { GET_EVENT_DETAIL_QK } from '@/constants/event';

// // api 호출 함수
// const getEvents = async (eventId: bigint): Promise<EventDetailResponse> => {
//   const response = await client<EventDetailResponse>({
//     method: 'GET',
//     url: `/events/${eventId}`,
//   });

//   // 응답 데이터 검증
//   // const parsedData = EventsResponseSchema.parse(response.data);
//   // return parsedData;
//   return response.data;
// };

// const useGetEvents = (eventId: bigint) => {
//   const { data } = useSuspenseQuery<
//     EventDetailResponse,
//     Error,
//     EventDetailResponse,
//     EventDetailQkType
//   >({
//     queryKey: [GET_EVENT_DETAIL_QK, eventId],
//     queryFn: () => getEvents(eventId),
//   });

//   return { data };
// };

// export default useGetEvents;
