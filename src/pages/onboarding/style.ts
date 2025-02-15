import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';
import styled from 'styled-components';

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
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  margin-top: 22px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  color: black;
`;

const BackwardWrapper = styled.div`
  position: absolute;
  top: 22px;
  left: 20px;
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
const Indicator = styled.div<{ $isActive: boolean }>`
  width: ${(props) => (props.$isActive ? '16px' : '7px')};
  height: 7px;
  border-radius: ${(props) => (props.$isActive ? '10px' : '50%')};
  background-color: ${(props) =>
    props.$isActive ? '#6b7280' : '#e5e7eb'}; // gray-500 / gray-200
  transition: all 0.3s ease-in-out;
`;

export {
  Container,
  Header,
  BackwardWrapper,
  ButtonWrapper,
  CarouselContainer,
  CarouselContents,
  MotionWrapper,
  SlideContainer,
  SlideImage,
  IndicatorWrapper,
  Indicator,
};
