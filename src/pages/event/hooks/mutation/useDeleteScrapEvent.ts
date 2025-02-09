import { clientAuth } from '@/apis/client';
import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from '@tanstack/react-query';
import { DeleteScrapResponseSchema, DeleteScrapResponse } from '@/types/event';
import ApiError from '@/apis/apiError';

// API 호출 함수
const deleteScrapEvent = async (
  eventId: bigint,
): Promise<DeleteScrapResponse> => {
  const response = await clientAuth<DeleteScrapResponse>({
    method: 'DELETE',
    url: `/events/scrap`,
    data: { eventId: eventId.toString() }, //BigInt는 기본적으로 JSON 직렬화가 되지 않음
  });

  // 응답 데이터 검증
  const parsedData = DeleteScrapResponseSchema.parse(response.data);
  return parsedData;
};

const useDeleteScrapEvent = () => {
  const { showBoundary } = useErrorBoundary();

  const { mutateAsync: deleteScrap, isPending: isDeleteScrapPending } =
    useMutation<DeleteScrapResponse, Error, bigint>({
      mutationFn: (eventId) => deleteScrapEvent(eventId),
      onSuccess: (data) => {
        console.log('이벤트 스크랩 취소 성공:', data.success?.message);
      },
      onError: (error) => {
        if (error instanceof ApiError) {
          showBoundary(error);
        } else {
          showBoundary(
            new ApiError('UNKNOWN_ERROR', '알 수 없는 에러가 발생했습니다.'),
          );
        }
      },
    });

  return { deleteScrap, isDeleteScrapPending };
};

export default useDeleteScrapEvent;
