import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.section`
  padding: 0 20px;
`;

export const Header = styled.header`
  display: flex;
  padding: 24px 24px 12px 24px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  color: ${theme.color.gray[900]};
  ${theme.typeFace.body['18SB']};
`;

export const CloseButton = styled.button`
  display: flex;
  width: 100vw;
  height: 42px;
  margin: 12px -20px 0 -20px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-top: 1px solid ${theme.color.gray[100]};
  color: ${theme.color.gray[900]};
  ${theme.typeFace.body['18SB']};
`;
