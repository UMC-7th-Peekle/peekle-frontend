import styled from 'styled-components';
import MapButtonSVG from '@/assets/images/event/map/mapButton.svg?react';

export const HeaderContainer = styled.section`
  width: 100%;
`;

export const EventPageContainer = styled.section`
  width: 100%;
  height: 100%;
`;

export const GoToMapButton = styled(MapButtonSVG)`
  position: fixed;
  right: 0;
  bottom: 74px;
`;
