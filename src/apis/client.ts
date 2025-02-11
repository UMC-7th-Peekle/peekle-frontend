import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean;
}

// ✅ AccessToken이 필요 없는 기본 axios 인스턴스
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 인터셉터: Authorization 헤더 추가
client.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    if (config.requireAuth) {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ 응답 인터셉터: AccessToken 만료 시 RefreshToken으로 재발급
client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (!error.response) return Promise.reject(error);

    const { data, config } = error.response;
    const errorCode = data?.error?.errorCode ?? 'UNKNOWN_ERROR';

    if (error.response.status === 401 && errorCode === 'TOKEN_003') {
      console.warn(
        '🔄 AccessToken이 만료되었습니다. RefreshToken으로 재발급 요청...',
      );

      try {
        // ✅ 쿠키에 저장된 RefreshToken 사용
        const { data: newTokenData } = await axios.get<{ accessToken: string }>(
          `${import.meta.env.VITE_API_URL}/auth/token/reissue`,
          {
            withCredentials: true, // ✅ 서버가 RefreshToken을 포함하도록 요청
          },
        );

        // ✅ 새 AccessToken 저장
        localStorage.setItem('accessToken', newTokenData.accessToken);
        console.log('✅ AccessToken 재발급 완료:', newTokenData.accessToken);

        // ✅ 원래 요청 재시도 (새 AccessToken 사용)
        config.headers.Authorization = `${newTokenData.accessToken}`;
        return client(config);
      } catch (refreshError) {
        console.error(
          '🚨 RefreshToken으로 AccessToken 재발급 실패:',
          refreshError,
        );
        localStorage.clear();
        window.location.href = '/';
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
