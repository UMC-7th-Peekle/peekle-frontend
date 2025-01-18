import styled from 'styled-components';
import ArrowDownSVG from '@/assets/images/icons/arrow-down.svg?react';

export const Select = styled.div<{ $isActive: boolean }>`
  display: flex;
  padding: 8px 12px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.gray[0] : theme.color.gray[400]};
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.color.primary[500] : theme.color.gray[0]};
  border: 1px solid
    ${({ $isActive, theme }) => !$isActive && theme.color.gray[100]};
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
  ${({ $isActive, theme }) =>
    $isActive ? theme.typeFace.body['16SB'] : theme.typeFace.body['16R']};
  cursor: pointer;
`;

export const ArrowDownIcon = styled(ArrowDownSVG)`
  width: 16px;
  height: 16px;
`;
