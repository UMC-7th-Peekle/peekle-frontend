import { useMutation } from '@tanstack/react-query';
import {
  UpdateEventResponse,
  UpdateEventResponseSchema,
  UpdateEventParams,
} from '@/types/event';
import { useHandleError } from '@/hooks';
import { clientAuth } from '@/apis/client';

const patchEvent = async ({
  eventId,
  eventData,
  files,
}: UpdateEventParams): Promise<UpdateEventResponse> => {
  const formData = new FormData();
  // JSON 데이터는 문자열로 변환해서 추가
  formData.append('body', JSON.stringify(eventData));

  // 이미지 파일 추가
  if (files && files.length > 0) {
    Array.from(files).forEach((file) => {
      formData.append('event-images', file);
    });
  }

  const response = await clientAuth<UpdateEventResponse>({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    url: `/events/${eventId}`,
    data: eventData,
  });

  // 응답 데이터 검증
  const parsedData = UpdateEventResponseSchema.parse(response.data);
  return parsedData;
};

const useUpdateEvent = () => {
  const handleError = useHandleError();

  const { mutateAsync: updateEvent, isPending } = useMutation<
    UpdateEventResponse,
    Error,
    UpdateEventParams
  >({
    mutationFn: ({ eventId, eventData, files }) =>
      patchEvent({ eventId, eventData, files }),
    onError: (error) => {
      handleError(error);
    },
  });

  return { updateEvent, isPending };
};

export default useUpdateEvent;
