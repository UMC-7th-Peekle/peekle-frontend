import { theme } from '@/styles/theme';
import styled from 'styled-components';
import HeartSvg from '@/assets/images/icons/heart-filled.svg?react';

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isLiked',
})<{ isLiked: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${theme.typeFace.caption['14B']};
  color: ${({ isLiked }) =>
    isLiked ? theme.color.sementic.red : theme.color.gray[200]};
  gap: 4px;
`;

const Heart = styled(HeartSvg).withConfig({
  shouldForwardProp: (prop) => prop !== 'isLiked',
})<{ isLiked: boolean }>`
  width: 18px;
  height: 18px;
  path {
    fill: ${({ isLiked }) =>
      isLiked ? theme.color.sementic.red : theme.color.gray[200]};
  }
`;

export { Container, Heart };
