import styled from 'styled-components';
import BackSVG from '@/assets/images/icons/back.svg?react';
import { theme } from '@/styles/theme';
import { BackSVGProps } from '@/types/common';

export const BackIcon = styled(BackSVG)<BackSVGProps>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  cursor: pointer;
  flex-shrink: 0;

  &:hover path {
    stroke: ${theme.color.primary['900']};
  }
`;
