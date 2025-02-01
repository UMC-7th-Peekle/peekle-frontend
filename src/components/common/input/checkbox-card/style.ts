import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Check from '@/assets/images/icons/check.svg?react';
import mediaQuery from '@/styles/mediaQuery';

// CheckboxCard 컨테이너 스타일
export const StyledCheckboxCard = styled.button<{
  $isChecked: boolean;
  $isLastCard: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  height: 56px;
  padding: 16px 14px;
  justify-content: space-between;
  border: ${({ $isChecked }) =>
    $isChecked
      ? `2px solid ${theme.color.gray[900]}`
      : `1px solid ${theme.color.gray[100]}`};
  border-radius: ${theme.borderRadius.sm};
  white-space: nowrap;
  cursor: pointer;

  ${mediaQuery.sMobile`
    height: 40px;
    padding: 8px 7px;
  `}
`;

// Card 문구 스타일
export const CardText = styled.span<{ $isChecked: boolean }>`
  color: ${({ $isChecked }) =>
    $isChecked ? theme.color.gray[900] : theme.color.gray[400]};
  ${({ $isChecked }) =>
    $isChecked ? theme.typeFace.body['15B'] : theme.typeFace.body['15M']};

  ${mediaQuery.sMobile`
    ${({ $isChecked }) =>
      $isChecked
        ? theme.typeFace.caption['13B']
        : theme.typeFace.caption['13R']};
  `}

  ${mediaQuery.xsMobile`
    ${({ $isChecked }) =>
      $isChecked
        ? theme.typeFace.caption['12B']
        : theme.typeFace.caption['12R']};
  `}
`;

// 체크 아이콘
export const CheckIcon = styled(Check)`
  width: 20px;
  height: 24px;

  ${mediaQuery.sMobile`
    width: 18px;
    height: 23px;
  `}
`;
