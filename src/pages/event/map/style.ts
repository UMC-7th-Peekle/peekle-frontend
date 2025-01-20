import styled from 'styled-components';
import MyLocationSVG from '@/assets/images/icons/my-location-rounded.svg?react';

export const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Map = styled.div`
  width: 100%;
  height: calc(100vh - 50px); // 헤더 영역 빼기
`;

export const MyLocationIcon = styled(MyLocationSVG)<{
  $bottomSheetHeight: number | 'auto';
}>`
  position: absolute;
  left: 24px;
  bottom: ${({ $bottomSheetHeight }) =>
    $bottomSheetHeight === 'auto' ? '24px' : `${24 + $bottomSheetHeight}px`};
`;
