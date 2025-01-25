import { APIResponseError } from 'endpoint-client';
import { QueryClient, QueryCache } from '@tanstack/react-query';

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
        console.log(error);
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
