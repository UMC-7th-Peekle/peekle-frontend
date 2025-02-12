import styled from 'styled-components';
import { Backward } from '@/components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoSVG from '@/assets/images/onboarding/kakao.svg?react';
import PhoneSVG from '@/assets/images/onboarding/phone.svg?react';
import HeaderSVG from '@/assets/images/onboarding/header.svg?react';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';
//import { alert } from '@/utils';
const OnboardingPage = () => {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;
  const kakao_client = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const allowedOrigins = ['http://localhost:5173', api];
  const handlephone = () => {
    navigate('/auth/phone-number');
  };
  const handleKakao = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakao_client}&redirect_uri=${api}auth/login/kakao/callback`;
    window.location.href = kakaoAuthURL;

    const popup = window.open(
      kakaoAuthURL,
      'kakaoLogin',
      'width=600,height=600',
    );

    if (!popup) {
      alert('팝업이 차단되었습니다. 팝업을 허용해주세요.');
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!allowedOrigins.includes(event.origin)) {
        console.error('허용되지 않은 origin:', event.origin);
        return;
      }
      // 백엔드 도메인과 일치하는지 확인

      console.log('카카오 로그인 데이터 수신:', event.data);

      if (event.data && event.data.access_token) {
        localStorage.setItem('accessToken', event.data.access_token);
        navigate('/'); // 로그인 성공 후 홈으로 이동
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);
  /**예외처리 추가 */
  const slides = [
    {
      src: '/onboarding/onboard_1.png',
      alt: 'Onboarding 1',
      text: '인생 2막의 시작\n시니어 정보 플랫폼 피클',
    },
    {
      src: '/onboarding/onboard_2.png',
      alt: 'Onboarding 2',
      text: '강좌부터 취미활동까지\n쉽게 찾아보세요',
    },
    {
      src: '/onboarding/onboard_3.png',
      alt: 'Onboarding 3',
      text: '일상과 고민을 나누며\n사람들과 함께해요',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ 2초마다 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Header>
        <HeaderSVG />
      </Header>
      <CarouselContainer>
        <MotionWrapper>
          <SlideContainer
            key={currentIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* ✅ 이미지 */}
            <SlideImage
              src={slides[currentIndex].src}
              alt={slides[currentIndex].alt}
            />
            {/* ✅ 문구 */}
            <CarouselContents>{slides[currentIndex].text}</CarouselContents>
          </SlideContainer>
        </MotionWrapper>
        <IndicatorWrapper>
          {slides.map((_, index) => (
            <Indicator key={index} isActive={index === currentIndex} />
          ))}
        </IndicatorWrapper>
      </CarouselContainer>
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
  width: 100%;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  align-items: center;
  justify-content: start;
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

const BackwardWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 30px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  margin-bottom: 30px;
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// ✅ 캐러셀 Wrapper
const MotionWrapper = styled.div`
  width: 100%;
  height: 90%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SlideContainer = styled(motion.div)`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column; /* ✅ 이미지 + 문구를 세로로 배치 */
  justify-content: center;
  align-items: center;
  position: absolute;
`;

// ✅ 이미지
const SlideImage = styled.img`
  width: 100%;
  max-width: 100vw;
  height: auto;
  object-fit: cover;
`;

// ✅ 문구 스타일
const CarouselContents = styled.div`
  margin-top: 16px;
  ${theme.typeFace.subTitle[24]};
  color: ${theme.color.gray[900]};
  text-align: center;
  white-space: pre-wrap;
`;

// ✅ Indicator Wrapper
const IndicatorWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

// ✅ 현재 지점 표시 (isActive에 따라 크기 변경)
const Indicator = styled.div<{ isActive: boolean }>`
  width: ${(props) => (props.isActive ? '16px' : '7px')};
  height: 7px;
  border-radius: ${(props) => (props.isActive ? '10px' : '50%')};
  background-color: ${(props) =>
    props.isActive ? '#6b7280' : '#e5e7eb'}; // gray-500 / gray-200
  transition: all 0.3s ease-in-out;
`;
