import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Chip = styled.button<{ $isActive: boolean }>`
  padding: 8px 14px;
  border-radius: ${theme.borderRadius.xsm};
  white-space: nowrap;
  color: ${({ $isActive }) =>
    $isActive ? theme.color.gray[0] : theme.color.gray[500]};
  ${({ $isActive }) =>
    $isActive ? theme.typeFace.body['16SB'] : theme.typeFace.body['16R']};
  background: ${({ $isActive }) =>
    $isActive ? theme.color.gray[900] : theme.color.gray[0]};
`;
