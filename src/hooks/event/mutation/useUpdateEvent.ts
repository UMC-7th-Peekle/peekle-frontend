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
  console.log('eventData', eventData);
  formData.append('body', JSON.stringify(eventData));

  // 이미지 파일 추가
  if (files?.length) {
    files.forEach((file) => formData.append('event-images', file));
  }
  // FormData 내부 데이터 확인
  console.log('formData Entries:');
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  const response = await clientAuth<UpdateEventResponse>({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'PATCH',
    url: `/events/${eventId}`,
    data: formData,
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
    mutationFn: patchEvent,
    onError: (error) => {
      handleError(error);
    },
  });

  return { updateEvent, isPending };
};

export default useUpdateEvent;
