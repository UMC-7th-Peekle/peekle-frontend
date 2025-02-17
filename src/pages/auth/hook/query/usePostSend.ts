import { useMutation } from '@tanstack/react-query';
import { client } from '@/apis/client';
import { useHandleError } from '@/hooks';

const postSend = async (phone: string) => {
  const response = await client.post('/auth/phone/send', { phone });
  return response.data;
};

const usePostSend = () => {
  const handleError = useHandleError();

  const { mutateAsync: fetchPostSend, isPending } = useMutation({
    mutationFn: postSend,
    onError: (error) => {
      handleError(error);
    },
    onSuccess: (data) => {
      localStorage.setItem(
        'phoneVerificationSessionId',
        data.success.phoneVerificationSessionId,
      );
    },
  });

  return { fetchPostSend, isPending };
};

export default usePostSend;
