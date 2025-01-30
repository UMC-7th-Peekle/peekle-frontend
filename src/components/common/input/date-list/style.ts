import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Plus from '@/assets/images/icons/plus.svg?react';
import mediaQuery from '@/styles/mediaQuery';

export const DateListCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isFocus',
})<{ isFocus: boolean }>`
  padding: 16px;
  width: 186px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: ${({ isFocus }) =>
    isFocus
      ? `2px solid ${theme.color.gray[600]}`
      : `1px solid ${theme.color.gray[100]}`};
  border-radius: ${theme.borderRadius.sm};
  ${theme.typeFace.body['18SB']};

  ${mediaQuery.sMobile`
    ${theme.typeFace.caption['14B']};
  `}
`;

// 문구 스타일
export const DateListText = styled.p`
  color: ${theme.color.gray['600']};
`;

export const DateListTextPlus = styled.p`
  color: ${theme.color.gray['400']};
`;

export const PlusIcon = styled(Plus)`
  width: 20px;
  color: ${theme.color.gray['400']};
`;
