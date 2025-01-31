import styled from 'styled-components';
import MapButtonSVG from '@/assets/images/event/map/mapButton.svg?react';
import mediaQuery from '@/styles/mediaQuery';

export const HeaderContainer = styled.section`
  width: 100%;
`;

export const EventPageContainer = styled.section`
  width: 100%;
  height: 100%;
`;

export const GoToMapButton = styled(MapButtonSVG)`
  position: fixed;
  right: 20px;
  bottom: 94px;
  ${mediaQuery.sMobile`
    right: 10px;
    bottom: 64px;
  `}
`;
