import { FixedBackward } from '@/components';
import { useNavigate } from 'react-router-dom';
import KakaoSVG from '@/assets/images/onboarding/kakao.svg?react';
import PhoneSVG from '@/assets/images/onboarding/phone.svg?react';
import HeaderSVG from '@/assets/images/onboarding/header.svg?react';
import * as S from './style';
import { ROUTES } from '@/constants/routes';
import { slides } from '@/constants/onboarding';
import useSlide from '@/pages/onboarding/hook/utils/useSlide';
import { useKakaoLogin } from '@/pages/onboarding/hook/utils/useKakaoLogin';

// 온보딩 페이지
const OnboardingPage = () => {
  const navigate = useNavigate();
  const { currentIndex } = useSlide();
  const { handleKakaoLogin } = useKakaoLogin();

  const handlephone = () => {
    navigate(ROUTES.AUTH_PHONE_NUMBER);
  };

  return (
    <S.Container>
      <FixedBackward />
      <S.Header>
        <HeaderSVG />
      </S.Header>
      <S.CarouselContainer>
        <S.MotionWrapper>
          <S.SlideContainer
            key={currentIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* ✅ 이미지 */}
            <S.SlideImage
              src={slides[currentIndex].src}
              alt={slides[currentIndex].alt}
            />
            {/* ✅ 문구 */}
            <S.CarouselContents>{slides[currentIndex].text}</S.CarouselContents>
          </S.SlideContainer>
        </S.MotionWrapper>
        <S.IndicatorWrapper>
          {slides.map((_, index) => (
            <S.Indicator key={index} $isActive={index === currentIndex} />
          ))}
        </S.IndicatorWrapper>
      </S.CarouselContainer>
      <S.ButtonWrapper>
        <S.KakaoButton onClick={handleKakaoLogin}>
          <KakaoSVG />
          <p>카카오로 5초만에 시작</p>
        </S.KakaoButton>
        <S.PhoneButton onClick={handlephone}>
          <PhoneSVG />
          <p>전화번호로 시작</p>
        </S.PhoneButton>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default OnboardingPage;
