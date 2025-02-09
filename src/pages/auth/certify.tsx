import styled from 'styled-components';
import { Backward } from '@/components';
import { useState } from 'react';
import { alert } from '@/utils';
import { BottomSheet, Button } from '@/components';
import { useBottomSheetStore } from '@/stores';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ResendSVG from '@/assets/images/auth/resend.svg?react';
import { useEffect } from 'react';

const CertifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, phoneVerificationSessionId } = location.state || {};
  const [code, setCode] = useState(['', '', '', '']); // 4자리 인증 코드
  const { setActiveBottomSheet } = useBottomSheetStore();
  const api = import.meta.env.VITE_API_URL;

  const [timeLeft, setTimeLeft] = useState(300); // 300초 = 5분

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const isCodeComplete = code.every((digit) => digit !== '');

  const handleChange = (index: number, value: string) => {
    if (/[^0-9]/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < code.length - 1) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const handleResend = () => {
    alert('인증번호를 다시 보냈어요!', 'none', '확인');
    setTimeLeft(300); // 타이머 다시 5분으로 설정
  };

  const handlePhone = () => {
    navigate('/auth/phone-number');
  };

  const handleVerify = async () => {
    if (!phone || !phoneVerificationSessionId) {
      alert('인증 정보를 찾을 수 없습니다.', 'warning', '확인');
      return;
    }

    if (timeLeft <= 0) {
      alert(
        '인증 시간이 만료되었습니다. 인증번호를 다시 요청해주세요.',
        'warning',
        '확인',
      );
      return;
    }

    const phoneVerificationCode = code.join('');

    try {
      const response = await fetch(`${api}/auth/phone/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          phoneVerificationSessionId,
          phoneVerificationCode,
        }),
      });

      const data = await response.json();

      if (response.ok && data.resultType === 'SUCCESS') {
        navigate('/auth/gender');
      } else {
        alert('인증번호가 맞지 않아요!', 'warning', '확인');
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  return (
    <Container>
      <BackwardWrapper onClick={handlePhone}>
        <Backward />
      </BackwardWrapper>

      <Title>
        인증번호 4자리를
        <br />
        입력해주세요
      </Title>

      <InputWrapper>
        {code.map((num, index) => (
          <Input
            key={index}
            id={`code-input-${index}`}
            type="text"
            value={num}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            filled={!!num}
          />
        ))}
        <ResendWrapper onClick={handleResend}>
          <ResendSVG /> 재전송
        </ResendWrapper>
      </InputWrapper>

      <HelpButton onClick={() => setActiveBottomSheet('helpsheet')}>
        도움이 필요해요!
      </HelpButton>

      {/* ✅ 인증 버튼 상태 변경 */}
      <ButtonWrapper>
        <StyledButton
          color="primary500"
          size="medium"
          isCodeComplete={isCodeComplete}
          disabled={!isCodeComplete || timeLeft <= 0} // 🔥 입력이 다 안되었거나 시간이 0이면 비활성화
          onClick={handleVerify}
        >
          {isCodeComplete ? '인증하기' : formatTime(timeLeft)}
        </StyledButton>
      </ButtonWrapper>

      <BottomSheet id="helpsheet">
        <SheetContent>
          <SheetTitle>
            인증번호 입력에 <br /> <Highlight>도움</Highlight>이 필요하신가요?
          </SheetTitle>

          <HelpBox>
            <HelpIcon>📱</HelpIcon>
            <HelpText>
              <strong>휴대폰 번호를 다시 확인해주세요</strong>
              <br />
              휴대폰 번호를 다르게 입력했을 경우 인증번호가 가지 않을 수 있어요.
            </HelpText>
          </HelpBox>

          <HelpBox>
            <HelpIcon>⚠️</HelpIcon>
            <HelpText>
              <strong>인증번호 횟수 10회 초과한 경우</strong>
              <br />
              10분 동안 인증 문자를 받을 수 없어요. 10분 뒤에 다시 시도해주세요.
            </HelpText>
          </HelpBox>

          <ContactButton>📞 고객센터에 연락해볼래요</ContactButton>
        </SheetContent>
      </BottomSheet>
    </Container>
  );
};

export default CertifyPage;

/* ✅ 버튼 상태 변경 스타일 */
const StyledButton = styled(Button)<{ isCodeComplete: boolean }>`
  background-color: ${({ isCodeComplete }) =>
    isCodeComplete ? '#4CAF50' : '#E0E0E0'};
  color: ${({ isCodeComplete }) => (isCodeComplete ? 'white' : '#BDBDBD')};
  cursor: ${({ isCodeComplete }) =>
    isCodeComplete ? 'pointer' : 'not-allowed'};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 28px;
  text-align: left;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 60px;
  margin-left: 20px;
  color: black;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;
const BackwardWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 30px;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
  margin-left: 15px;
`;

const Input = styled.input<{ filled: boolean }>`
  width: 40px;
  height: 50px;
  font-size: 24px;
  text-align: center;
  border: none;
  outline: none;
  font-weight: bold;

  border-bottom: 2px solid ${({ filled }) => (filled ? '#000' : '#cacdd3')};
  &:focus {
    border-bottom: 2px solid #0f0f0f;
  }
  background-color: #ffffff;
`;

const ResendWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #4caf50;
  font-size: 20px;
  cursor: pointer;
  margin-top: 10px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;
const HelpButton = styled.button`
  background: #eaeced;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 200px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  color: #464b53;
`;

const SheetContent = styled.div`
  padding: 20px;
  text-align: left;
`;

const SheetTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Highlight = styled.span`
  color: #4caf50;
  font-weight: 700;
`;

const HelpBox = styled.div`
  display: flex;
  align-items: flex-start;
  background: #f6f8fa;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const HelpIcon = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;

const HelpText = styled.div`
  font-size: 14px;
  color: #333;
`;

const ContactButton = styled.button`
  width: 100%;
  background: #4caf50;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-top: 16px;
`;
