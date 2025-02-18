import { theme } from '@/styles/theme';
import styled, { keyframes, css } from 'styled-components';

// ✅ 등장 애니메이션 (아래에서 위로 슬라이드)
const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }`;

// ✅ 사라지는 애니메이션 (위에서 아래로 슬라이드)
const slideDown = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }`;

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
  transition: opacity 0.3s ease-out;
`;

// ✅ 신고 입력 모달 (닫힐 때 애니메이션 적용)
const ReportModal = styled.div<{ $isClosing?: boolean }>`
  width: 100%;
  background: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  padding: 0px 16px;

  ${({ $isClosing }) =>
    $isClosing
      ? css`
          animation: ${slideDown} 0.3s ease-out forwards;
        `
      : css`
          animation: ${slideUp} 0.3s ease-out forwards;
        `}
`;

// ✅ 상단 닫기 바
const CloseBar = styled.div`
  width: 32px;
  height: 4px;
  background: ${theme.color.gray[100]};
  border-radius: 2px;
  margin: 16px auto;
`;

// ✅ 신고 입력창
const ReportInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ReportInput = styled.textarea`
  width: 100%;
  height: 160px;
  border: none;
  border-radius: 8px;
  padding: 12px;
  resize: none;
  outline: none;
  color: ${theme.color.gray[400]};
  ${theme.typeFace.body['18R']};
  font-family: 'pretendard';
  background-color: ${theme.color.gray[50]};

  &::placeholder {
    color: ${theme.color.gray[400]};
  }
`;

// ✅ 글자 수 표시 (우측 하단 정렬)
const CharCount = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  color: ${theme.color.gray[400]};
  ${theme.typeFace.body['18R']};
`;

// ✅ 버튼 컨테이너
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 16px;
  gap: 8px;
  margin-bottom: 16px;
`;

// ✅ 취소 버튼
const CancelButton = styled.button`
  flex: 30%;
  height: 48px;
  color: ${theme.color.gray[400]};
  border-radius: 8px;
  cursor: pointer;
  border: none;
  ${theme.typeFace.body['18SB']}
`;

// ✅ 신고 버튼
const ReportButton = styled.button`
  flex: 70%;
  height: 56px;
  background: ${theme.color.sementic.red};
  color: white;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  ${theme.typeFace.body['18SB']};
`;

export {
  BottomSheetOverlay,
  ReportModal,
  CloseBar,
  ReportInputWrapper,
  ReportInput,
  CharCount,
  ButtonWrapper,
  CancelButton,
  ReportButton,
};
