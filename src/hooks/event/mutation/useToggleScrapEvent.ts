import { clientAuth } from '@/apis/client';
import { useMutation } from '@tanstack/react-query';
import { useHandleError } from '@/hooks';
import queryClient from '@/lib/tanstack-query/queryClient';
import {
  ToggleScrapEventResponseSchema,
  ToggleScrapEventResponse,
  ToggleScrapEventParams,
  EventDetailResponse,
} from '@/types/event';
import { GET_EVENT_DETAIL_QK } from '@/constants/event';

// API 호출 함수
const toggleScrapEvent = async ({
  eventId,
  isScraped,
}: ToggleScrapEventParams): Promise<ToggleScrapEventResponse> => {
  console.log('api 호출에서 초기 isScraped', isScraped);
  const response = await clientAuth<ToggleScrapEventResponse>({
    method: isScraped ? 'DELETE' : 'POST',
    url: `/events/scrap`,
    data: { eventId },
  });

  // 응답 데이터 검증
  const parsedData = ToggleScrapEventResponseSchema.parse(response.data);
  return parsedData;
};

const useToggleScrapEvent = () => {
  const handleError = useHandleError();

  const { mutateAsync: toggleScrap } = useMutation<
    ToggleScrapEventResponse,
    Error,
    ToggleScrapEventParams,
    { prevData?: EventDetailResponse }
  >({
    mutationFn: ({ eventId, isScraped }) =>
      toggleScrapEvent({ eventId, isScraped }),
    onMutate: async ({ eventId, isScraped }) => {
      await queryClient.cancelQueries({
        queryKey: [GET_EVENT_DETAIL_QK, eventId],
      });

      const prevData = queryClient.getQueryData<EventDetailResponse>([
        GET_EVENT_DETAIL_QK,
        eventId,
      ]);

      queryClient.setQueryData(
        [GET_EVENT_DETAIL_QK, eventId],
        (old?: EventDetailResponse) =>
          old
            ? {
                ...old,
                success: {
                  ...old.success,
                  event: {
                    ...old.success?.event,
                    isScraped: !isScraped,
                  },
                },
              }
            : prevData,
      );

      return { prevData };
    },
    onError: (error, { eventId }, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(
          [GET_EVENT_DETAIL_QK, eventId],
          context.prevData,
        );
      }
      handleError(error);
    },
    onSettled: (_, __, { eventId }) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_DETAIL_QK, eventId],
      });
    },
  });

  return { toggleScrap };
};

export default useToggleScrapEvent;
