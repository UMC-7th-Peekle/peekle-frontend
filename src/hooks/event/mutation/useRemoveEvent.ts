import { clientAuth } from '@/apis/client';
import { useMutation } from '@tanstack/react-query';
import { useHandleError } from '@/hooks';
import { RemoveEventResponseSchema, RemoveEventResponse } from '@/types/event';
import { toast } from '@/utils';
import queryClient from '@/lib/tanstack-query/queryClient';

// API 호출 함수
const deleteEvent = async (eventId: number): Promise<RemoveEventResponse> => {
  const response = await clientAuth<RemoveEventResponse>({
    method: 'DELETE',
    url: `/events`,
    data: { eventId },
  });

  // 응답 데이터 검증
  const parsedData = RemoveEventResponseSchema.parse(response.data);
  return parsedData;
};

const useRemoveEvent = () => {
  const handleError = useHandleError();

  const { mutateAsync: removeEvent, isPending } = useMutation<
    RemoveEventResponse,
    Error,
    number
  >({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => {
      toast('이벤트가 삭제되었어요.');
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      console.log(error);
      handleError(error);
    },
  });

  return { removeEvent, isPending };
};

export default useRemoveEvent;
