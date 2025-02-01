import styled from 'styled-components';
import MylocationButtonSVG from '@/assets/images/event/map/mylocationButton.svg?react';
import ListButtonSVG from '@/assets/images/event/map/listButton.svg?react';

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 12px;
  height: calc(100vh - 210px); // 헤더, nav 영역 빼기
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
`;

export const BottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  padding: 24px 20px;
  justify-content: space-between;
  align-items: center;
`;

export const MyLocationIcon = styled(MylocationButtonSVG)``;

export const GoToListButton = styled(ListButtonSVG)``;
