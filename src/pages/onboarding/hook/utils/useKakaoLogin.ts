import { useState, useCallback } from 'react';
import { z } from 'zod';
import { KAKAO_LOGIN } from '@/constants/onboarding';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

// ✅ Zod 스키마 정의
const KakaoUserSchema = z.object({
  id: z.number().optional(),
  email: z.string().email().optional(),
  userId: z.number().optional(),
  name: z.string().optional(),
  nickname: z.string().optional(),
});

const KakaoLoginResponseSchema = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  isRegistered: z.boolean(),
  userInfo: KakaoUserSchema,
});

export type KakaoUser = z.infer<typeof KakaoUserSchema>;
export type KakaoLoginResponse = z.infer<typeof KakaoLoginResponseSchema>;

export const useKakaoLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginResult, setLoginResult] = useState<KakaoLoginResponse | null>(
    null,
  );
  const navigate = useNavigate();

  // ✅ 카카오 로그인
  const handleKakaoLogin = useCallback(() => {
    return new Promise<KakaoLoginResponse>((resolve, reject) => {
      setIsLoading(true);

      // ✅ 전체 화면 크기로 팝업 열기
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const kakaoLoginWindow = window.open(
        KAKAO_LOGIN,
        'kakaoLoginPopup',
        `width=${screenWidth},height=${screenHeight},left=0,top=0,fullscreen=yes`,
      );

      if (!kakaoLoginWindow) {
        alert('팝업 차단을 해제해주세요!');
        setIsLoading(false);
        return;
      }

      const messageHandler = (event: MessageEvent) => {
        const allowedOrigins = [
          window.location.origin,
          import.meta.env.VITE_API_URL,
        ];

        if (!allowedOrigins.includes(event.origin)) {
          return;
        }

        try {
          // ✅ Zod 검증
          const validatedData = KakaoLoginResponseSchema.parse(event.data);

          // ✅ 로그인 성공 시 처리
          if (validatedData.isRegistered && validatedData.accessToken) {
            localStorage.setItem('accessToken', validatedData.accessToken);
            console.log(validatedData.accessToken);
            setLoginResult(validatedData);
            resolve(validatedData);
            navigate(ROUTES.EVENT);
          } else {
            // id 값 저장
            localStorage.setItem('kakao-id', String(validatedData.userInfo.id));
            localStorage.setItem('email', String(validatedData.userInfo.email));
            setLoginResult(validatedData);
            resolve(validatedData);
            navigate(ROUTES.AUTH_PHONE_NUMBER);
          }
        } catch (error) {
          console.error('[handleKakaoLogin] Invalid response format:', error);
          reject(error);
        }

        // ✅ 이벤트 리스너 제거
        window.removeEventListener('message', messageHandler);
        setIsLoading(false);

        // ✅ 팝업 창 닫기
        if (kakaoLoginWindow) kakaoLoginWindow.close();
      };

      window.addEventListener('message', messageHandler);
    });
  }, [navigate]);

  return { handleKakaoLogin, isLoading, loginResult };
};
