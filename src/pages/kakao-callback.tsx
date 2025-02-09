import { useEffect } from 'react';

const LoginSuccess = () => {
  useEffect(() => {
    const sendCodeToServer = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) {
        console.error('인가 코드 없음');
        window.close();
        return;
      }

      try {
        const response = await fetch(
          'http://localhost:3001/auth/kakao/callback',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          },
        );

        const data = await response.json();
        console.log('서버 응답:', data);

        if (window.opener) {
          window.opener.postMessage(data, window.location.origin); // 부모 창에 데이터 전달
          window.close();
        } else {
          console.warn(
            'window.opener가 없습니다. localStorage에 저장 후 이동합니다.',
          );
          localStorage.setItem('accessToken', data.access_token);
          window.location.href = '/';
        }
      } catch (error) {
        console.error('서버 응답 요청 실패:', error);
        window.close();
      }
    };

    sendCodeToServer();
  }, []);

  return <div>카카오 로그인 처리 중...</div>;
};

export default LoginSuccess;
