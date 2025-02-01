import styled from 'styled-components';
import { Backward } from '@/components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultSVG from '@/assets/images/onboarding/default.svg?react';
import KakaoSVG from '@/assets/images/onboarding/kakao.svg?react';
import PhoneSVG from '@/assets/images/onboarding/phone.svg?react';
import HeaderSVG from '@/assets/images/onboarding/header.svg?react';
import Onboard2SVG from '@/assets/images/onboarding/onboard2.svg?react';
import Onboard3SVG from '@/assets/images/onboarding/onboard3.svg?react';
const OnboardingPage = () => {
  const navigate = useNavigate();
  const handlephone = () => {
    navigate('/auth/phone-number');
  };
  const api = import.meta.env.VITE_API_URL;
  const [currentSVG, setCurrentSVG] = useState(0);
  const svgComponents = [<DefaultIcon />, <Two />, <Three />];

  // ✅ 3초마다 SVG 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSVG((prev) => (prev + 1) % svgComponents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleKakao = async () => {
    try {
      const response = await fetch(`${api}/auth/login/kako`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        navigate('/auth/phone-number');
      }
      const data = await response.json();
      console.log('KAKAO login response:', data);
      navigate('/event');
    } catch (error) {
      console.error('Kakao login error:', error);
      alert('카카오 로그인에 실패했습니다.');
    }
  };
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Header>
        <HeaderSVG />
      </Header>
      <TitleWrapper>
        {svgComponents[currentSVG]}
        {/**DefaultSVG, Onboard2SVG,Onboard3SVG가 3초마다 SVG가 변경됨 */}
      </TitleWrapper>
      <ButtonWrapper>
        <KakaoSVG onClick={handleKakao} />
        <PhoneSVG onClick={handlephone} />
      </ButtonWrapper>
    </Container>
  );
};

export default OnboardingPage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  margin-top: 0px;
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
const Two = styled(Onboard2SVG)`
  width: 370px;
  margin-right: 100px;
  margin-top: -30px;
`;
const Three = styled(Onboard3SVG)`
  width: 370px;
  margin-right: 100px;
  margin-top: -30px;
`;
