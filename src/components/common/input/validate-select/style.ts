import styled from 'styled-components';
import { StyledValidateSelectProps } from '@/types/common';
import { theme } from '@/styles/theme';

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledSelect = styled.select<StyledValidateSelectProps>`
  width: 100%;
  padding: 0.5rem;
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid
    ${({ $errorMessage }) =>
      $errorMessage ? theme.color.sementic.red : theme.color.gray[500]};
  &:focus {
    outline: 1px solid
      ${({ $errorMessage }) =>
        $errorMessage ? theme.color.sementic.red : theme.color.gray[500]};
    border-color: ${({ $errorMessage }) =>
      $errorMessage ? theme.color.sementic.red : theme.color.gray[500]};
  }
`;

export const Message = styled.p<StyledValidateSelectProps>`
  position: absolute;
  bottom: -19px;
  left: 1px;
  ${theme.typeFace.caption['13R']};
  color: ${({ $errorMessage }) =>
    $errorMessage ? theme.color.sementic.red : theme.color.gray[500]};
`;
