import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import { HeartSVGProps } from '@/types/common';
import HeartSVG from '@/assets/images/icons/heart.svg?react';
import HeartFilledSVG from '@/assets/images/icons/heart-filled.svg?react';

const IconStyle = css<HeartSVGProps>`
  width: ${(props) => `${props.$size}px`};
  height: ${(props) => `${props.$size}px`};
  color: ${({ $borderColor }) =>
    $borderColor ?? theme.color.gray[600]}; // filled에는 컬러 반영 안됨
  flex-shrink: 0;
`;

export const HeartWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeartIcon = styled(HeartSVG)`
  ${IconStyle}
`;

export const HeartFilledIcon = styled(HeartFilledSVG)`
  ${IconStyle}
`;
