import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import {
  CreateEventResponse,
  CreateEventResponseSchema,
  CreateEventParams,
} from '@/types/event';
import { useHandleError } from '@/hooks';
import { toast } from '@/utils';
import { clientAuth } from '@/apis/client';
import queryClient from '@/lib/tanstack-query/queryClient';

const postEvent = async ({
  eventData,
  files,
}: CreateEventParams): Promise<CreateEventResponse> => {
  const formData = new FormData();
  // JSON 데이터는 문자열로 변환해서 추가
  formData.append('body', JSON.stringify(eventData));

  // 이미지 파일 추가
  if (files?.length) {
    files.forEach((file) => formData.append('event-images', file));
  }

  const response = await clientAuth<CreateEventResponse>({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    url: '/events',
    data: formData,
  });

  // 응답 데이터 검증
  const parsedData = CreateEventResponseSchema.parse(response.data);
  return parsedData;
};

const useCreateEvent = () => {
  const handleError = useHandleError();
  const navigate = useNavigate();

  const { mutateAsync: createEvent, isPending } = useMutation<
    CreateEventResponse,
    Error,
    CreateEventParams
  >({
    mutationFn: ({ eventData, files }) => postEvent({ eventData, files }),
    onSuccess: () => {
      toast('이벤트가 생성되었어요.');
      navigate(ROUTES.ADMIN);
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      handleError(error);
    },
  });

  return { createEvent, isPending };
};

export default useCreateEvent;
