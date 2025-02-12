import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { client } from '@/apis/client';
import {
  getEventsParams,
  // EventsResponseSchema,
  EventsResponse,
  EventsQkType,
} from '@/types/event';

// api 호출 함수
const getEvents = async ({
  limit,
  cursor,
  categories,
  locations,
  price,
  startDate,
  endDate,
  query,
}: getEventsParams): Promise<EventsResponse> => {
  const response = await client<EventsResponse>({
    method: 'GET',
    url: `/events`,
    params: {
      limit,
      cursor,
      category: categories,
      location: locations,
      price,
      startDate,
      endDate,
      query,
    },
  });

  // 응답 데이터 검증
  // const parsedData = EventsResponseSchema.parse(response.data);
  // return parsedData;
  // console.log(typeof response.data.success.events[0].eventId);
  console.log(response.data);
  return response.data;
};

const useGetEvents = ({
  limit = 10,
  cursor,
  categories,
  locations,
  price = '전체',
  startDate,
  endDate,
  query,
}: getEventsParams) => {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery<
      EventsResponse,
      Error,
      InfiniteData<EventsResponse>,
      EventsQkType
    >({
      queryKey: [
        'events',
        limit,
        cursor,
        categories,
        locations,
        price,
        startDate,
        endDate,
        query,
      ],
      queryFn: ({ pageParam }) =>
        getEvents({
          limit,
          cursor: pageParam ? (pageParam as number) : undefined,
          categories,
          locations,
          price,
          startDate,
          endDate,
          query,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        if (!lastPage) return undefined;
        return lastPage.success?.nextCursor ?? undefined;
      },
    });

  return { data, error, fetchNextPage, hasNextPage, isFetching };
};

export default useGetEvents;
