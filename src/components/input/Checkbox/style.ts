import styled from 'styled-components';
import Check from '@/assets/images/icons/check.svg?react';

export const StyledCheckbox = styled.div<{ isChecked: boolean }>`
  width: 22px;
  height: 22px;
  border: ${({ isChecked, theme }) =>
    isChecked ? 'none' : `2px solid ${theme.color.gray['100']}`};
  border-radius: 0.25rem;
  background-color: ${({ isChecked, theme }) =>
    isChecked ? theme.color.primary['500'] : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.1s ease,
    border-color 0.1s ease,
    transform 0.1s ease;

  &:hover {
    border-color: ${({ isChecked, theme }) =>
      isChecked ? 'transparent' : theme.color.primary['300']};
  }
`;

export const StyledIcon = styled(Check)<{ isChecked: boolean }>`
  width: 40px;
  height: 32px;
  opacity: ${({ isChecked }) => (isChecked ? 1 : 0)};
  transition:
    opacity 0.1s ease,
    transform 0.1s ease;
`;
