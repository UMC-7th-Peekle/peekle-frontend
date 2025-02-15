import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import {
  getEventsScrappedParams,
  // GetEventsScrappedResponseSchema,
  EventsScrappedResponse,
  EventsScrappedQKType,
} from '@/types/event';
import { GET_EVENTS_SCRAPPED_QK } from '@/constants/event';

// api 호출 함수
const getEventScrap = async ({
  limit,
  cursor,
  categories,
}: getEventsScrappedParams): Promise<EventsScrappedResponse> => {
  const response = await clientAuth<EventsScrappedResponse>({
    method: 'GET',
    url: `/events/scrap?scrap=true`,
    params: {
      limit,
      cursor,
      category: categories,
    },
  });

  // 응답 데이터 검증
  // const parsedData = EventsResponseSchema.parse(response.data);
  // return parsedData;
  return response.data;
};

const useGetEventScrap = ({
  limit = 10,
  cursor,
  categories,
}: getEventsScrappedParams) => {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery<
      EventsScrappedResponse,
      Error,
      InfiniteData<EventsScrappedResponse>,
      EventsScrappedQKType
    >({
      queryKey: [GET_EVENTS_SCRAPPED_QK, limit, cursor, categories],
      queryFn: ({ pageParam }) =>
        getEventScrap({
          limit,
          cursor: pageParam ? (pageParam as number) : undefined,
          categories,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        if (!lastPage) return undefined;
        return lastPage.success?.nextCursor ?? undefined;
      },
    });

  return { data, error, fetchNextPage, hasNextPage, isFetching };
};

export default useGetEventScrap;
