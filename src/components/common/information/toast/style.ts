import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Toast = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 380px;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.color.gray[600]};
  ${theme.typeFace.body['16SB']};
  color: ${theme.color.gray[0]};
  z-index: 120;
  text-align: center;
`;
