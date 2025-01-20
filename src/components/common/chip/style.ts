import styled from 'styled-components';

export const Chip = styled.button<{ $isActive: boolean }>`
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.primary[600] : theme.color.gray[400]};
  ${({ $isActive, theme }) =>
    $isActive ? theme.typeFace.body['16SB'] : theme.typeFace.body['16R']};
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.color.primary[50] : 'transparent'};
`;
