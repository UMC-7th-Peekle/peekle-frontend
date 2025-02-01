import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import ApiError from './apiError';
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean;
}
// accessToken이 필요 없을 때 쓰이는 axios 함수입니다.
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    //&& localStorage.getItem('accessToken') - 로그인 로직 구현 후 해당 주석을 하단 if문 안에 추가해주시면 됩니다.
    if (config.requireAuth) {
      // 로그인 로직 구현 전에는 accessToken 변수에 임시 토큰 넣어서 테스트하시면 됩니다.
      // const accessToken = localStorage.getItem('accessToken');
      const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      const errorCode = data?.error?.errorCode ?? 'UNKNOWN_ERROR';
      const reason = data?.error?.reason ?? '알 수 없는 오류입니다.';
      const apiError = new ApiError(errorCode, reason, data);

      /* 액세스 토큰 만료 시 로직 처리 */
      if (error.response.data.code === 'TOKEN_003') {
        // 로컬스토리지를 비우고 홈으로 이동
        localStorage.clear();
        window.location.href = '/';
      }

      // ApiError 객체 반환
      return Promise.reject(apiError);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

// accessToken이 필요할 때 쓰이는 axios 함수입니다.
export const clientAuth = <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return client({
    ...config,
    requireAuth: true,
  } as CustomInternalAxiosRequestConfig);
};
