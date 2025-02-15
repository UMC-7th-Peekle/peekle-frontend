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
    onMutate: async ({ eventId, isScrapped }) => {
      await queryClient.cancelQueries({
        queryKey: [TOGGLE_SCRAP_EVENT_QK, eventId],
      });

      const prevData = queryClient.getQueryData<ToggleScrapEventResponse>([
        TOGGLE_SCRAP_EVENT_QK,
        eventId,
      ]);

      queryClient.setQueryData(
        [TOGGLE_SCRAP_EVENT_QK, eventId],
        (old?: ToggleScrapEventResponse) =>
          old
            ? {
                ...old,
                success: {
                  ...old.success,
                  isScrapped: !old.success?.isScrapped,
                  scrapCount: isScrapped
                    ? Math.max(0, (old.success?.scrapCount ?? 0) - 1) // 하나 감소
                    : (old.success?.scrapCount ?? 0) + 1, // 하나 증가
                },
              }
            : {
                resultType: 'SUCCESS',
                error: null,
                success: { message: '', isScrapped: true, scrapCount: 1 },
              },
      );
      return {
        prevData: prevData ?? {
          resultType: 'SUCCESS',
          error: null,
          success: { message: '', isScrapped: false, scrapCount: 0 },
        },
      };
    },
    onError: (error, { eventId }, context) => {
      if (context?.prevData) {
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
