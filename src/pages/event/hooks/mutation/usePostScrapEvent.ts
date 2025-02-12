import { clientAuth } from '@/apis/client';
import { useMutation } from '@tanstack/react-query';
import { useHandleError } from '@/hooks';
import { ScrapResponseSchema, ScrapResponse } from '@/types/event';

// API 호출 함수
const postScrapEvent = async (eventId: bigint): Promise<ScrapResponse> => {
  const response = await clientAuth<ScrapResponse>({
    method: 'POST',
    url: `/events/scrap`,
    data: { eventId: eventId.toString() },
  });

  // 응답 데이터 검증
  const parsedData = ScrapResponseSchema.parse(response.data);
  return parsedData;
};

const usePostScrapEvent = () => {
  const handleError = useHandleError();

  const { mutateAsync: scrapEvent, isPending: isScrapEventPending } =
    useMutation<ScrapResponse, Error, bigint>({
      mutationFn: (eventId) => postScrapEvent(eventId),
      onSuccess: (data) => {
        console.log('이벤트 스크랩 성공:', data.success?.message);
      },
      onError: (error) => handleError(error),
    });

  return { scrapEvent, isScrapEventPending };
};

export default usePostScrapEvent;
