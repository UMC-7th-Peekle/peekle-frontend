import styled from 'styled-components';
import HeartSvg from '@/assets/images/icons/heart-filled.svg?react';
import { theme } from '@/styles/theme';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Heart = styled(HeartSvg).withConfig({
  shouldForwardProp: (prop) => prop !== 'isLiked',
})<{ isLiked: boolean }>`
  width: 18px;
  path {
    fill: ${({ isLiked }) =>
      isLiked ? theme.color.sementic.red : theme.color.gray[200]};
  }
`;

const Count = styled.p<{ $isLiked: boolean }>`
  ${theme.typeFace.caption['14B']};
  color: ${({ $isLiked }) =>
    $isLiked ? theme.color.sementic.red : theme.color.gray[200]};
`;

export { Column, Heart, Count };
