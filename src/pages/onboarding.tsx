import styled from 'styled-components';
import { Backward } from '@/components';
import { useNavigate } from 'react-router-dom';
import defaultSVG from '@/assets/images/onboarding/default.svg?react';
import KakaoSVG from '@/assets/images/onboarding/kakao.svg?react';
import PhoneSVG from '@/assets/images/onboarding/phone.svg?react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  margin-top: -10px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  color: black;
`;

const TitleWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BackwardWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 30px;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px;

  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column; /* 버튼을 세로 방향으로 정렬 */
  gap: 12px; /* 버튼 사이 간격 */
  align-items: center;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
`;

const DefaultIcon = styled(defaultSVG)`
  width: 370px;
  margin-right: 50px;
  margin-top: -30px;
`;
const OnboardingPage = () => {
  const navigate = useNavigate();
  const handlephone = () => {
    navigate('/auth/phone-number');
  };
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Header>Peekle 로그인</Header>
      <TitleWrapper>
        <DefaultIcon />
      </TitleWrapper>
      <ButtonWrapper>
        <KakaoSVG />
        <PhoneSVG onClick={handlephone} />
      </ButtonWrapper>
    </Container>
  );
};

export default OnboardingPage;
