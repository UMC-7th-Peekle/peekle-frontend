import styled, { css } from 'styled-components';
import MenuSVG from '@/assets/images/icons/menu.svg?react';
import MapSVG from '@/assets/images/icons/map-filled.svg?react';
import { theme } from '@/styles/theme';

const IconStyle = css`
  width: 20px;
  height: 20px;
  color: ${theme.color.gray[600]};
`;

export const MenuIcon = styled(MenuSVG)`
  ${IconStyle}
`;
export const MapIcon = styled(MapSVG)`
  ${IconStyle}
`;

export const RoundedButton = styled.button`
  display: flex;
  height: 40px;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: ${theme.borderRadius.xlg};
  background: ${theme.color.gray[0]};
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.16);
`;

export const Text = styled.span`
  color: ${theme.color.gray[600]};
  ${theme.typeFace.body['15B']}
`;
