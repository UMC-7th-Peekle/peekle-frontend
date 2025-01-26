import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Toast = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.color.gray[600]};
  ${theme.typeFace.body['16SB']};
  color: ${theme.color.gray[0]};
  z-index: 120;

  transition: opacity 0.3s ease;
  &.fade-out {
    animation: ${fadeOut} 0.5s forwards;
  }
`;
