import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { client } from '@/apis/client';
import {
  getEventsParams,
  EventsResponseSchema,
  EventsResponse,
  EventsQkType,
} from '@/types/event';

// api 호출 함수
const getEvents = async ({
  limit,
  cursor,
  category,
  location,
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
      category,
      location,
      price,
      startDate,
      endDate,
      query,
    },
  });

  // 응답 데이터 검증
  const parsedData = EventsResponseSchema.parse(response.data);
  return parsedData;
};

const useGetEvents = ({
  limit,
  cursor,
  category,
  location,
  price,
  startDate,
  endDate,
  query = '',
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
        category,
        location,
        price,
        startDate,
        endDate,
        query,
      ],
      queryFn: () =>
        getEvents({
          limit,
          cursor,
          category,
          location,
          price,
          startDate,
          endDate,
          query,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.success?.nextCursor,
    });

  return { data, error, fetchNextPage, hasNextPage, isFetching };
};

export default useGetEvents;
