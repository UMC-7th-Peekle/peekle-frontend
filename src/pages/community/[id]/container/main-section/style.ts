import { theme } from '@/styles/theme';
import styled from 'styled-components';

// ✅ 전체 컨테이너
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  background-color: ${theme.color.gray[0]};
  margin-bottom: 16px;
  padding: 0px 16px;
`;

// ✅ 프로필 스타일
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: start;
  gap: 12px;
`;

const ProfileImage = styled.div<{ image: string; size?: string }>`
  width: ${({ size }) => size || '48px'};
  height: ${({ size }) => size || '48px'};
  border-radius: 50%;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const ProfileName = styled.p`
  color: ${theme.color.gray[900]};
  ${theme.typeFace.body['16SB']};
`;

const ProfileDate = styled.p`
  color: ${theme.color.gray[500]};
  ${theme.typeFace.caption['14R']};
`;

// ✅ 제목 & 내용 스타일
const Title = styled.h1`
  color: ${theme.color.gray[900]};
  ${theme.typeFace.subTitle[20]};
`;

const Content = styled.p`
  color: ${theme.color.gray[900]};
  ${theme.typeFace.body['16R']};
`;

// ✅ 좋아요 & 댓글 수 컨테이너
const CountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 8px;
`;

// ✅ 이미지 목록 스타일
const ImageWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding: 8px 0;
  scroll-snap-type: x mandatory;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageItem = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  scroll-snap-align: start;
`;

// ✅ 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  touch-action: pan-x;
  position: relative;
`;

const ModalSlider = styled.div.attrs<{ $currentIndex: number }>((props) => ({
  style: {
    transform: `translateX(-${props.$currentIndex * 100}vw)`,
  },
}))`
  display: flex;
  width: 100vw;
  height: 100%;
  transition: transform 0.3s ease-out;
`;

const ModalImage = styled.img`
  width: 100vw;
  height: auto;
  max-height: 90vh;
  object-fit: contain; /* ✅ 원본 비율 유지 */
`;

export {
  MainContainer,
  Profile,
  ProfileDate,
  ProfileImage,
  ProfileName,
  ProfileTextContainer,
  Title,
  Content,
  CountWrapper,
  ImageWrapper,
  ImageItem,
  ModalOverlay,
  ModalContent,
  ModalSlider,
  ModalImage,
};
