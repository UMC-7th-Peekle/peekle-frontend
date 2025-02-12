import { useErrorBoundary } from 'react-error-boundary';
import ApiError from '@/apis/apiError';

const useErrorHandler = () => {
  const { showBoundary } = useErrorBoundary();
  const handleError = (error: unknown) => {
    if (error instanceof ApiError) {
      showBoundary(error);
    } else {
      showBoundary(
        new ApiError('UNKNOWN_ERROR', '알 수 없는 에러가 발생했습니다.'),
      );
    }
  };

  return handleError;
};

export default useErrorHandler;
