import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Appbar = styled.div`
  height: 62px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AppbarIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  gap: 24px;
`;

export const Title = styled.h1`
  color: ${theme.color.gray[900]};
  font-size: ${theme.typeFace.subTitle[24]};
`;
