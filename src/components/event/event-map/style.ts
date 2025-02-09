import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const MapContainer = styled.div`
  width: 100vw;
  height: calc(100vh - var(--nav-height)); // nav 영역 빼기
  margin-left: -16px;
  position: absolute;
  top: 0;
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

export const BottomContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
  bottom: calc(20px + var(--nav-height));
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const EventCardWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 16px;
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.color.gray[0]};
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.16);
`;
