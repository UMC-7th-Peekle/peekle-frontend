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
  height: 100vh;
`;

export const MyLocationIcon = styled(MyLocationSVG)`
  position: absolute;
  left: 24px;
  bottom: 24px;
`;
