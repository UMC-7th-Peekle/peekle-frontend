import { ROUTES } from '@/constants/routes';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean;
}

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const { data } = await axios.get<{ accessToken: string }>(
          `${import.meta.env.VITE_API_URL}/auth/token/reissue`,
          {
            withCredentials: true,
          },
        );

        localStorage.setItem('accessToken', data.accessToken);
        error.config.headers.Authorization = `${data.accessToken}`;
        return client(error.config);
      } catch (refreshError) {
        console.error(
          '🚨 RefreshToken으로 AccessToken 재발급 실패:',
          refreshError,
        );
        window.location.href = ROUTES.ONBOARDING;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

// ✅ AccessToken이 필요한 요청을 위한 axios 함수
export const clientAuth = <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return client({
    ...config,
    requireAuth: true,
  } as CustomInternalAxiosRequestConfig);
};
