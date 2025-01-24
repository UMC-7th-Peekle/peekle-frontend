import styled from 'styled-components';
import LineSVG from '@/assets/images/icons/line.svg?react';

// const slideIn = keyframes`
//    from { transform: translateY(100%); }
//    to { transform: translateY(0); }
// `;

// const slideOut = keyframes`
//   from { transform: translateY(0); }
//   to { transform: translateY(100%); }
// `;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 101; // 네이버 지도 위
`;

export const BottomSheet = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 102;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.md}
    ${({ theme }) => theme.borderRadius.md} 0px 0px;
  background: ${({ theme }) => theme.color.gray[0]};
  & > * {
    width: 100%;
  } //자식요소가 width를 100%로 채우게

  transition: transform 150ms ease-out;
`;

export const BottomSheetHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0 15px 0;
  cursor: pointer;
`;

export const lineIcon = styled(LineSVG)`
  width: 32px;
  color: ${({ theme }) => theme.color.gray[100]};
`;

export const BottomSheetContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
