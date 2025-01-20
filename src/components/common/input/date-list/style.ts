import styled from 'styled-components';
import Plus from '@/assets/images/icons/plus.svg?react';

export const DateListCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isFocus',
})<{ isFocus: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 186px;
  height: 63px;
  padding: 1rem;
  padding-left: 0.75rem;
  border: 1px solid
    ${({ theme, isFocus }) =>
      isFocus ? theme.color.primary['500'] : theme.color.gray['100']};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.color.gray['0']};
`;

// 문구 스타일
export const DateListText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray['900']};
`;

export const DateListTextPlus = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray['400']};
`;

export const PlusIcon = styled(Plus)`
  width: 20px;
  fill: ${({ theme }) => theme.color.gray['400']};
`;
