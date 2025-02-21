import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { client } from '@/apis/client';
import {
  getEventsParams,
  // EventsResponseSchema,
  EventsResponse,
  EventsQkType,
} from '@/types/event';
import { useEventsStore } from '@/stores';

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
  lat,
  lng,
  southWest,
  northEast,
  sort,
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
      lat,
      lng,
      southWest,
      northEast,
      sort,
    },
  });

  // 204 No Content 처리
  if (!response.data || Object.keys(response.data).length === 0) {
    return {
      resultType: 'SUCCESS',
      error: null,
      success: {
        events: [], // 빈 배열로 초기화
        hasNextPage: false,
        nextCursor: null,
      },
    };
  }

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
  lat,
  lng,
  southWest,
  northEast,
  sort,
}: getEventsParams) => {
  const { setEvents } = useEventsStore();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useSuspenseInfiniteQuery<
      EventsResponse,
      Error,
      InfiniteData<EventsResponse>,
      EventsQkType
    >({
      queryKey: [
        'events',
        {
          limit,
          cursor,
          categories: JSON.stringify(categories),
          locations: JSON.stringify(locations),
          price,
          startDate,
          endDate,
          query,
          lat,
          lng,
          southWest,
          northEast,
          sort,
        },
      ],
      queryFn: ({ pageParam }) =>
        getEvents({
          limit,
          cursor: pageParam as number | undefined,
          categories,
          locations,
          price,
          startDate,
          endDate,
          query,
          lat,
          lng,
          southWest,
          northEast,
          sort,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        if (!lastPage) return undefined;
        return lastPage.success?.nextCursor ?? undefined;
      },
    });

  // events가 변경될 때만 상태 업데이트
  useEffect(() => {
    const events = data.pages.flatMap((page) => page.success?.events ?? []);
    setEvents(events);
  }, [data, setEvents]);

  return { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage };
};

export default useGetEvents;
