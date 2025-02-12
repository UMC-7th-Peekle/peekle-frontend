import { ROUTES } from '@/constants/routes';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean;
}

// ✅ 기본 Axios 인스턴스 생성
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ 쿠키 기반 인증 허용 (RefreshToken 필요)
});

// ✅ 요청 인터셉터 추가 (AccessToken 포함)
client.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    if (config.requireAuth) {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ 응답 인터셉터 추가 (AccessToken 만료 시 재발급)
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // ✅ RefreshToken으로 AccessToken 재발급 요청
        const { data } = await axios.get<{ accessToken: string }>(
          `${import.meta.env.VITE_API_URL}/auth/token/reissue`,
          { withCredentials: true },
        );

        // ✅ 새 AccessToken 저장
        localStorage.setItem('accessToken', data.accessToken);

        // ✅ 원래 요청에 새 AccessToken 추가 후 재시도
        error.config.headers.Authorization = `${data.accessToken}`;
        return client(error.config);
      } catch (refreshError) {
        // ✅ RefreshToken도 만료된 경우, 로그아웃 처리
        localStorage.clear();
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
