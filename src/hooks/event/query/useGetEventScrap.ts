import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import {
  getEventsScrappedParams,
  GetEventsScrappedResponseSchema,
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

  // 응답 데이터 검증
  const parsedData = GetEventsScrappedResponseSchema.parse(response.data);
  return parsedData;
};

const useGetEventScrap = ({
  limit = 10,
  cursor,
  categories,
}: getEventsScrappedParams) => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery<
      EventsScrappedResponse,
      Error,
      InfiniteData<EventsScrappedResponse>,
      EventsScrappedQKType
    >({
      queryKey: [
        GET_EVENTS_SCRAPPED_QK,
        limit,
        cursor,
        JSON.stringify(categories), // 배열을 문자열로 변환하여 정확한 비교
      ],
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

  return { data, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};

export default useGetEventScrap;
