import styled, { keyframes } from 'styled-components';
import LineSVG from '@/assets/images/icons/line.svg?react';

const slideIn = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideOut = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

export const BottomSheet = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.md}
    ${({ theme }) => theme.borderRadius.md} 0px 0px;
  background: ${({ theme }) => theme.color.gray[0]};
  & > * {
    width: 100%;
  } //자식요소가 width를 100%로 채우게

  animation: ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)} 0.3s ease;
`;

export const LineIcon = styled(LineSVG)`
  width: 32px;
  color: ${({ theme }) => theme.color.gray[100]};
  margin: 12px 0 15px 0;
`;
