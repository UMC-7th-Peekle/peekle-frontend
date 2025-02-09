import React, { useState } from 'react';
import styled from 'styled-components';
import { Backward } from '@/components';
import { Button } from '@/components/common/input/button/index';
import { useNavigate } from 'react-router-dom';
const PhoneNumberPage = () => {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const [phone, setPhone] = useState('');
  const [phoneVerificationSessionId, setPhoneVerificationSessionId] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 입력

    if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    }
    setPhone(value);
  };
  const handleOnboarding = () => {
    navigate('/onboarding');
  };
  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const PhoneNumber = phone.replace(/-/g, '');
    try {
      const statusResponse = await fetch(
        `${api}/auth/phone/account/status?phone=${PhoneNumber}`,
      );
      const statusData = await statusResponse.json();
      console.log('상태:', statusData);
      if (statusData.resultType === 'FAIL') {
        if (statusData.error?.reason === '탈퇴한 사용자입니다.') {
          navigate('/auth/certify');
        } else if (statusData.error?.reason === '휴면 상태인 사용자입니다.') {
          navigate('/auth/sleeper');
        }
      } else if (statusData.resultType === 'SUCCESS') {
        const client = await fetch(`${api}/auth/phone/send`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ phone: PhoneNumber }),
        });
        const data = await client.json();
        if (client.ok) {
          setPhoneVerificationSessionId(data.phoneVerificationSessionId);
          console.log(
            'phoneVerificationSessionId:',
            phoneVerificationSessionId,
          );
          navigate('/auth/certify', {
            state: {
              phone: PhoneNumber,
              phoneVerificationSessionId:
                data.success.phoneVerificationSessionId,
            },
          });
        } else {
          console.error('Error,data');
        }
      }
    } catch (error) {
      console.error('Request failed:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      {/* 뒤로가기 버튼 */}
      <BackwardWrapper onClick={handleOnboarding}>
        <Backward />
      </BackwardWrapper>
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
        onChange={handleChange}
        maxLength={13}
        placeholder="휴대폰 번호 입력"
      />
      <ButtonWrapper>
        <Button
          color="primary500"
          size="medium"
          width="412px"
          disabled={phone.length < 13 || loading}
          onClick={handleSubmit}
        >
          {loading ? '전송 중...' : '인증 번호 받기'}
        </Button>
      </ButtonWrapper>
    </Container>
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
const BackwardWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 30px;
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
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
