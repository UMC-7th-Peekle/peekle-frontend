import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Check from '@/assets/images/icons/check.svg?react';

// CheckboxCard 컨테이너 스타일
export const StyledCheckboxCard = styled.button<{
  $isChecked: boolean;
  $isLastCard: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 16px 14px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border: ${({ $isChecked }) =>
    $isChecked
      ? `2px solid ${theme.color.gray[900]}`
      : `1px solid ${theme.color.gray[100]}`};
  border-radius: ${theme.borderRadius.sm};
  white-space: nowrap;
  cursor: pointer;
`;

// Card 문구 스타일
export const CardText = styled.span<{ $isChecked: boolean }>`
  color: ${({ $isChecked }) =>
    $isChecked ? theme.color.gray[900] : theme.color.gray[400]};
  ${({ $isChecked }) =>
    $isChecked ? theme.typeFace.body['15B'] : theme.typeFace.body['15M']};
`;

// 체크 아이콘
export const CheckIcon = styled(Check)`
  width: 24px;
  height: 24px;
`;
