import styled from 'styled-components';
import { StyledValidateInputProps } from '@/types/common';
import { theme } from '@/styles/theme';

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledTextInput = styled.input<StyledValidateInputProps>`
  width: 100%;
  padding: 1rem;
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

export const Message = styled.p<StyledValidateInputProps>`
  position: absolute;
  bottom: -19px;
  left: 1px;
  ${theme.typeFace.caption['14B']};
  color: ${({ $errorMessage }) =>
    $errorMessage ? theme.color.sementic.red : theme.color.gray[500]};
`;
