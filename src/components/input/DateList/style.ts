import styled from 'styled-components';
import Plus from '@/assets/images/icons/plus.svg?react';

export const DateListCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 181px;
  height: 55px;
  padding: 1rem;
  padding-left: 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.gray['100']};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.color.gray['0']};
`;

// 문구 스타일
export const DateListText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray['900']};
`;

export const DateListTextNone = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray['400']};
`;

export const PlusIcon = styled(Plus)`
  fill: ${({ theme }) => theme.color.gray['400']};
`;
