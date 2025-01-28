import { APIResponseError } from 'endpoint-client';
import { QueryClient, QueryCache } from '@tanstack/react-query';
import { toast } from '@/utils';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (error instanceof APIResponseError) {
        if (error.body.code === 'invalid_token') {
          localStorage.removeItem('accessToken');
          window.location.href = '/';
        }
      }

      // 백그라운드 refetch error
      if (query.state.data !== undefined) {
        toast(`에러가 발생했습니다: ${error.message}`);
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default queryClient;
