import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

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
    if (config.requireAuth && localStorage.getItem('accessToken')) {
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
    console.log(error.response.data);
    if (error.response) {
      console.error('Response error:', error.response.status);

      /* 액세스 토큰 만료 시 로직 처리 */
      if (error.response.data.code === 'TOKEN_003') {
        // 로컬스토리지를 비우고 홈으로 이동
        localStorage.clear();
        window.location.href = '/';
      }
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
