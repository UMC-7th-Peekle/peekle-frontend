import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const api = import.meta.env.VITE_API_URL;

const CertifyPage = () => {
  const location = useLocation();
  const { phone, phoneVerificationSessionId } = location.state || {};
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    if (!phoneVerificationCode || phoneVerificationCode.length !== 6) {
      alert('4자리 인증 번호를 입력해주세요.');
      return;
    }
    try {
      const response = await axios.post(`${api}/auth/phone/verify`, {
        phone,
        phoneVerificationSessionId,
        phoneVerificationCode,
      });
      if (response.status === 200) {
        setMessage('인증되었습니다.');
      }
    } catch (error) {
      // error 타입 확인 및 처리
      if (axios.isAxiosError(error)) {
        // AxiosError 타입일 경우
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setMessage('4자리 코드가 아닙니다.');
              break;
            case 403:
              setMessage('인증코드가 틀렸습니다.');
              break;
            case 429:
              setMessage('요청 가능 횟수를 초과했습니다.');
              break;
            default:
              setMessage('알 수 없는 오류가 발생했습니다.');
          }
        } else {
          setMessage('서버와 연결할 수 없습니다.');
        }
      } else {
        // 예상하지 못한 오류 처리
        setMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };
  const handleResend = () => {
    // 인증번호 재전송 로직 구현 (예: 서버 요청)
    setMessage('인증번호를 다시 보냈어요.');
  };

  const handleHelp = () => {
    // 도움 요청 모달 표시 로직 구현
    alert('도움이 필요해요! 기능이 준비 중입니다.');
  };
  if (!phone || !phoneVerificationSessionId) {
    return <div>인증 정보가 없습니다. 다시 시도해주세요.</div>;
  }
  return (
    <div>
      <div>인증번호 4자리를</div>
      <div>입력해주세요</div>
      <input
        type="text"
        value={phoneVerificationCode}
        onChange={(e) => setPhoneVerificationCode(e.target.value)}
        maxLength={6}
      />
      <button onClick={handleResend}>재전송</button>

      <button onClick={handleHelp}>도움이 필요해요!</button>

      <button onClick={handleVerify}>인증하기</button>

      {message && <div>{message}</div>}
    </div>
  );
};

export default CertifyPage;
