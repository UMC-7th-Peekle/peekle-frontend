import { clientAuth } from '@/apis/client';
import { useMutation } from '@tanstack/react-query';
import { useHandleError } from '@/hooks';
import { RemoveEventResponseSchema, RemoveEventResponse } from '@/types/event';
import { toast } from '@/utils';

// API 호출 함수
const deleteEvent = async (eventId: number): Promise<RemoveEventResponse> => {
  const response = await clientAuth<RemoveEventResponse>({
    url: `/events`,
    data: { eventId: eventId },
  });

  // 응답 데이터 검증
  const parsedData = RemoveEventResponseSchema.parse(response.data);
  return parsedData;
};

const useRemoveEvent = () => {
  const handleError = useHandleError();

  const { mutateAsync: removeEvent } = useMutation<
    RemoveEventResponse,
    Error,
    number
  >({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => {
      toast('이벤트가 삭제되었어요.');
    },
    onError: (error) => {
      console.log(error);
      handleError(error);
    },
  });

  return { removeEvent };
};

export default useRemoveEvent;
