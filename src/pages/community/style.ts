import styled from 'styled-components';
import { theme } from '@/styles/theme';
import PeekleLogoSvg from '@/assets/images/icons/peekle-logo.svg?react';

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

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

export const PeekleLogo = styled(PeekleLogoSvg)``;

export const Title = styled.h1`
  color: ${theme.color.gray[900]};
  font-size: ${theme.typeFace.body['18SB']};
`;

export const EditButtonWrapper = styled.div`
  position: fixed;
  bottom: 88px;
  right: 16px;
  z-index: 1000;
`;
