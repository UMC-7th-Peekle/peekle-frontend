import { theme } from '@/styles/theme';
import styled, { keyframes } from 'styled-components';

// ✅ 메인 컨테이너
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// ✅ 상단 AppBar 스타일
const Appbar = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
`;

// ✅ 제목 스타일
const Title = styled.h1`
  color: black;
  ${theme.typeFace.subTitle[20]};
`;

// ✅ 구분선 스타일
const Boundary = styled.div`
  width: 100%;
  height: 16px;
  background-color: ${theme.color.gray[50]};
`;

// ✅ 바텀시트 오픈 애니메이션 (아래에서 위로 슬라이드)
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// ✅ 바텀시트 오버레이 (배경)
const BottomSheetOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;

// ✅ 바텀시트 컨테이너
const BottomSheet = styled.div`
  width: 100%;
  height: 201px;
  background: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  animation: ${slideUp} 0.3s ease-out;
`;

// ✅ 바텀시트 옵션 버튼
const BottomSheetOption = styled.button`
  width: 100%;
  height: 56px;
  font-size: 16px;
  color: ${theme.color.gray[900]};
  background: white;
  border: none;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;

  &:hover {
    background: ${theme.color.gray[100]};
  }
`;

// ✅ 바텀시트 닫기 버튼
const BottomSheetCancel = styled(BottomSheetOption)`
  border-top: ${theme.color.gray[100]} 1px solid;
  color: ${theme.color.gray[200]};
`;

// ✅ 삭제 확인 모달 배경
const DeleteConfirmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

// ✅ 삭제 확인 모달 컨테이너
const DeleteConfirmModal = styled.div`
  width: 312px;
  height: 149px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  gap: 8px;
`;

// ✅ 삭제 확인 문구
const DeleteTitle = styled.p`
  ${theme.typeFace.body['18SB']};
  color: ${theme.color.gray[900]};
  margin-bottom: 16px;
  margin-top: 8px;
`;

// ✅ 버튼 컨테이너
const DeleteConfirmButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 8px;
`;

// ✅ 취소 버튼
const CancelButton = styled.button`
  flex: 1;
  height: 56px;
  width: 100%;
  color: ${theme.color.gray[200]};
  border: none;
  cursor: pointer;
  ${theme.typeFace.body['18SB']};
`;

// ✅ 삭제 버튼
const DeleteButton = styled(CancelButton)`
  color: ${theme.color.primary[500]};
  ${theme.typeFace.body['18SB']};
`;

export {
  MainContainer,
  Title,
  Appbar,
  Boundary,
  BottomSheetOverlay,
  BottomSheet,
  BottomSheetOption,
  BottomSheetCancel,
  DeleteConfirmOverlay,
  DeleteConfirmModal,
  DeleteTitle,
  DeleteConfirmButtonWrapper,
  CancelButton,
  DeleteButton,
};
