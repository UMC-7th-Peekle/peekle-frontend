import styled from 'styled-components';
import MyLocationSVG from '@/assets/images/icons/my-location-rounded.svg?react';

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

export const MyLocationIcon = styled(MyLocationSVG)<{
  $bottomSheetHeight: number | 'auto';
}>`
  position: absolute;
  left: 24px;
  bottom: ${({ $bottomSheetHeight }) =>
    $bottomSheetHeight === 'auto' ? '24px' : `${$bottomSheetHeight}px`};
`;
