import { useState } from 'react';
import styled from 'styled-components';
import { FixedBackward } from '@/components';
import { useNavigate } from 'react-router-dom';
import useFormatPhoneNumber from './hook/useFormatPhoneNumber';
import { theme } from '@/styles/theme';

const PhoneNumberPage = () => {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  useFormatPhoneNumber(phone, setPhone);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const phoneNumber = phone.replace(/-/g, '');
    try {
      const statusResponse = await fetch(
        `${api}/auth/phone/account/status?phone=${phoneNumber}`,
      );
      const statusData = await statusResponse.json();

      let alreadyRegisteredUser = false;

      if (statusData.resultType === 'FAIL') {
        if (statusData.error?.reason === '탈퇴한 사용자입니다.') {
          navigate('/auth/certify');
        } else if (statusData.error?.reason === '휴면 상태인 사용자입니다.') {
          navigate('/auth/sleeper');
        }
      } else if (statusData.resultType === 'SUCCESS') {
        if (statusData.success.message === '가입된 사용자의 전화번호입니다.') {
          alreadyRegisteredUser = true;
        }
        const client = await fetch(`${api}/auth/phone/send`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ phone: phoneNumber }),
        });
        const data = await client.json();
        console.log(data);
        if (client.ok) {
          localStorage.setItem('phone-number', String(phoneNumber));
          localStorage.setItem(
            'phoneVerificationSessionId',
            data.success.phoneVerificationSessionId,
          );
          localStorage.setItem(
            'alreadyRegisteredUser',
            String(alreadyRegisteredUser),
          );
          navigate('/auth/certify');
        }
      }
    } catch (error) {
      console.error('Request failed:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Container>
        {/* 뒤로가기 버튼 */}
        <FixedBackward />
        {/* 입력 안내 문구 */}
        <Title>
          휴대폰 번호를
          <br />
          입력해주세요
        </Title>

        {/* 전화번호 입력 필드 */}
        <Input
          type="text"
          inputMode="numeric"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={13}
          placeholder="휴대폰 번호 입력"
        />
      </Container>
      <NextButton
        disabled={phone.length < 13 || loading}
        onClick={handleSubmit}
      >
        {loading ? '전송 중...' : '인증 번호 받기'}
      </NextButton>
    </>
  );
};

export default PhoneNumberPage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: white;
  padding: 20px;
`;
const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 28px;
  text-align: left;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 60px;
  margin-left: 10px;
  color: black;
`;

const Input = styled.input`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  width: 95%;
  font-size: 18px;
  padding: 12px;
  margin-top: 10px;
  border: none;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
  text-align: left;
  outline: none;
  &::placeholder {
    color: #aaa;
  }
  margin-bottom: 100px;
`;
const NextButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.typeFace.subTitle[20]};
  background-color: ${theme.color.primary[500]};
  color: ${theme.color.gray[50]};
  :disabled {
    background-color: ${theme.color.gray[100]};
    color: ${theme.color.gray[200]};
  }
`;
