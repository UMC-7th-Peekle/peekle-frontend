import styled from 'styled-components';
import { theme } from '@/styles/theme';
import CheckSVG from '@/assets/images/icons/check.svg?react';
import mediaQuery from '@/styles/mediaQuery';

export const CheckItem = styled.div`
  display: flex;
  width: 100%;
  padding: 14px 0;
  justify-content: space-between;
  align-items: center;

  ${mediaQuery.sMobile`
    padding: 7px 0;
  `}
`;

export const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive }) =>
    $isActive ? theme.color.gray[900] : theme.color.gray[400]};
  ${({ $isActive }) =>
    $isActive ? theme.typeFace.body['18SB'] : theme.typeFace.body['18R']};
`;

export const CheckIcon = styled(CheckSVG)`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
`;
