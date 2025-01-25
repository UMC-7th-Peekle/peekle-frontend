import styled from 'styled-components';
import BackSVG from '@/assets/images/icons/back.svg?react';
import { theme } from '@/styles/theme';

export const BackIcon = styled(BackSVG)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover path {
    stroke: ${theme.color.primary['900']};
  }
`;
