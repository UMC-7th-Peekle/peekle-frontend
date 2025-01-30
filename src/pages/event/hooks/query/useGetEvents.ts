// import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
// import { client } from '@/apis/client';
// import {
//   EventsResponseSchema,
//   EventsResponse,
//   EventsQkType,
// } from '../../types';

// // api 호출 함수
// const getEvents = async (): Promise<EventsResponse> => {
//   const response = await client<EventsResponse>({
//     method: 'GET',
//     url: ``,
//   });

//   // 응답 데이터 검증
//   const parsedData = EventsResponseSchema.parse(response.data);
//   return parsedData;
// };

// export const useGetEvents = () => {
//   return useSuspenseInfiniteQuery<
//     EventsResponse,
//     Error,
//     InfiniteData<EventsResponse>,
//     EventsQkType
//   >({
//     queryKey: ['events'],
//     queryFn: () => getEvents(),
//   });
// };
