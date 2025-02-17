import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import { HeartSVGProps } from '@/types/common';
import HeartSVG from '@/assets/images/icons/heart.svg?react';
import HeartFilledSVG from '@/assets/images/icons/heart-filled.svg?react';

const IconStyle = css<HeartSVGProps>`
  width: ${(props) => `${props.$size}px`};
  height: ${(props) => `${props.$size}px`};
  flex-shrink: 0;
`;

export const HeartWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeartIcon = styled(HeartSVG)<HeartSVGProps>`
  ${IconStyle}
  color: ${(props) => props.$borderColor ?? theme.color.gray[400]};
`;

export const HeartFilledIcon = styled(HeartFilledSVG)<HeartSVGProps>`
  ${IconStyle}
  color: ${(props) => props.$filledColor ?? theme.color.sementic.red};
`;
