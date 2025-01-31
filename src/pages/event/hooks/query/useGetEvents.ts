// import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
// import { client } from '@/apis/client';
// import {
//   EventsResponseSchema,
//   EventsResponse,
//   EventsQkType,
// } from '../../types';

// // api 호출 함수
// const getEvents = async ({
//   limit,
//   cursor,
// }: ): Promise<EventsResponse> => {
//   const response = await client<EventsResponse>({
//     method: 'GET',
//     url: `/community`,
//     params: {
//       limit,
//       cursor,
//     },
//   });

//   // 응답 데이터 검증
//   const parsedData = EventsResponseSchema.parse(response.data);
//   return parsedData;
// };

// export const useGetEvents = ({
//   limit = 10,
//   cursor = null,
//   query = '',
//   communityId,
// }: ) => {
//   return useSuspenseInfiniteQuery<
//     EventsResponse,
//     Error,
//     InfiniteData<EventsResponse>,
//     EventsQkType
//   >({
//     queryKey: ['events', limit, cursor, query],
//     queryFn: () => getEvents({ limit, cursor, query, communityId }),
//   });
// };
