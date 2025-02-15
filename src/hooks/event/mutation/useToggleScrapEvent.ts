import { clientAuth } from '@/apis/client';
import { useMutation } from '@tanstack/react-query';
import { useHandleError } from '@/hooks';
import queryClient from '@/lib/tanstack-query/queryClient';
import {
  ToggleScrapEventResponseSchema,
  ToggleScrapEventResponse,
  ToggleScrapEventParams,
  ToggleScrapEventContext,
} from '@/types/event';
import { TOGGLE_SCRAP_EVENT_QK } from '@/constants/event';

// API 호출 함수
const toggleScrapEvent = async (
  eventId: bigint,
  isScrapped: boolean,
): Promise<ToggleScrapEventResponse> => {
  const response = await clientAuth<ToggleScrapEventResponse>({
    method: isScrapped ? 'DELETE' : 'POST',
    url: `/events/scrap`,
    data: { eventId: eventId.toString() },
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
    ToggleScrapEventContext
  >({
    mutationFn: ({ eventId, isScrapped }) =>
      toggleScrapEvent(eventId, isScrapped),
    onSuccess: async (_, { eventId }) => {
      await queryClient.cancelQueries({
        queryKey: [TOGGLE_SCRAP_EVENT_QK, eventId],
      });
      const prevData = queryClient.getQueryData<ToggleScrapEventResponse>([
        TOGGLE_SCRAP_EVENT_QK,
        eventId,
      ]);
      queryClient.setQueryData(
        [TOGGLE_SCRAP_EVENT_QK, eventId],
        (prev: ToggleScrapEventResponse) => ({
          ...prev,
        }),
      );
      return { prevData };
    },
    onError: (error, { eventId }, context) => {
      if (context) {
        queryClient.setQueryData(
          [TOGGLE_SCRAP_EVENT_QK, eventId],
          context.prevData,
        );
      }
      handleError(error);
    },
    onSettled: (_, __, { eventId }) => {
      queryClient.invalidateQueries({
        queryKey: [TOGGLE_SCRAP_EVENT_QK, eventId],
      });
    },
  });

  return { toggleScrap };
};

export default useToggleScrapEvent;
