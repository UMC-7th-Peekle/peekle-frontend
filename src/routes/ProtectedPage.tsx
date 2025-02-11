import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { getRefreshTokenFromCookie } from '@/apis/getRefreshToken';

// ✅ 페이지 보호 컴포넌트
const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = getRefreshTokenFromCookie();
    if (!refreshToken) {
      navigate(ROUTES.ONBOARDING, { replace: true });
    }
  }, [navigate]);

  return children;
};

export default ProtectedPage;
