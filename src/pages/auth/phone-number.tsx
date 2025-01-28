import { useState } from 'react';
import axios from 'axios';
const api = import.meta.env.VITE_API_URL;
import { useNavigate } from 'react-router-dom';

const PhoneNumberPage = () => {
  // phone 상태를 단순히 문자열로 관리합니다.
  const [phoneValue, setPhoneValue] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null); //세션 ID 상태
  const [loading, setLoading] = useState(false); //로딩 상태
  const navigate = useNavigate();

  // 전화번호 포맷을 처리하는 함수
  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자 외의 문자 제거

    // 전화번호 형식에 맞게 하이픈 추가
    if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    }
    setPhoneValue(value); // 상태 업데이트
  };
  const handleSubmit = async () => {
    if (phoneValue.length === 13 && !/^\d{3}-\d{4}-\d{4}$/.test(phoneValue)) {
      alert('올바른 전화번호를 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      // 서버에 POST 요청 보내기 (전화번호 전송)
      const response = await axios.post(`${api}/auth/phone/send`, {
        phone: phoneValue,
      });
      // 응답 처리: 서버에서 반환한 세션 ID 저장
      if (response.data.phoneVerificationSessionId) {
        setSessionId(response.data.phoneVerificationSessionId);
        alert('인증 번호 확인이 완료되었습니다!');
        navigate('/auth/certify', {
          state: { phone: phoneValue, phoneVerificationSessionId: sessionId },
        });
      } else {
        alert('서버 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('전화번호 인증 요청 중 오류 발생:', error);
      alert('서버와의 연결이 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div>
      <div>휴대폰 번호를</div>
      <div>입력해주세요</div>
      <input
        type="text"
        name="phone"
        value={phoneValue} // state 값 바인딩
        onChange={handleNumber} // 핸들러 함수 호출
        maxLength={14} // 전화번호 입력 길이 제한
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? '인증 중...' : '인증 번호 확인'}
      </button>
      {sessionId && <div>세션 ID: {sessionId}</div>}
    </div>
  );
};

export default PhoneNumberPage;
