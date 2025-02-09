import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken); // 토큰 저장
      navigate('/auth/phone-number'); // 로그인 성공 후 홈으로 이동
    }
  }, []);

  return <div>로그인 성공! 이동 중...</div>;
};

export default LoginSuccess;
