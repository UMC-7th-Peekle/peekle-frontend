import styled from 'styled-components';
import ArrowDownSVG from '@/assets/images/icons/arrow-down.svg?react';
import { theme } from '@/styles/theme';

export const Dropdown = styled.div<{ $isActive: boolean; $width?: string }>`
  position: relative;
  display: flex;
  padding: 8px 12px;
  height: 40px;
  width: ${({ $width }) => $width ?? '100%'};
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

export const List = styled.ul<{ $dropdownRect?: DOMRect }>`
  position: absolute;
  top: ${({ $dropdownRect }) => $dropdownRect?.bottom ?? 40}px;
  left: ${({ $dropdownRect }) => $dropdownRect?.left ?? 0}px;
  width: 186px;
  z-index: 11;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 16px;
  background: ${theme.color.gray[0]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export const ListItem = styled.li<{ $isActive: boolean }>`
  align-self: stretch;
  color: ${({ $isActive }) =>
    $isActive ? theme.color.gray[900] : theme.color.gray[400]};
  ${({ $isActive }) =>
    $isActive ? theme.typeFace.body['18SB'] : theme.typeFace.body['18R']};
`;
