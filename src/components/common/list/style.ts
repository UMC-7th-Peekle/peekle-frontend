import styled from 'styled-components';
import ListSvg from '@/assets/images/icons/three-dot.svg?react';
import { BackSVGProps } from '@/types/common';

export const BackIcon = styled(ListSvg)<BackSVGProps>`
  width: ${({ $size }) => ($size ? $size : '24px')};
  height: ${({ $size }) => ($size ? $size : '24px')};
  cursor: pointer;
  flex-shrink: 0;

  &:hover path {
    stroke: #2e2e2e;
  }
`;
