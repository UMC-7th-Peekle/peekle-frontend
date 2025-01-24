import styled, { css } from 'styled-components';
import { StyledButtonProps } from '@/types/common';
import { theme } from '@/styles/theme';

// 공동 disabled 스타일
const disabledStyle = css`
  cursor: not-allowed;
  pointer-events: none;
  background-color: ${theme.color.gray[100]};
`;

const colorStyles = {
  primary500: css`
    background: ${theme.color.primary[500]};
    color: ${theme.color.gray[0]};
  `,
  primary700: css`
    background: ${theme.color.primary[700]};
    color: ${theme.color.gray[0]};
  `,
  gray50: css`
    background: ${theme.color.gray[50]};
    color: ${theme.color.gray[400]};
  `,
  none: css`
    background: none;
    color: ${theme.color.gray[400]};
  `,
  // 라인 버튼
  primary400: css`
    background: none;
    color: ${theme.color.primary[400]};
    border: 1px solid ${theme.color.primary[400]};
  `,
};

const sizeStyles = {
  small: css`
    border-radius: ${theme.borderRadius.sm};
    ${theme.typeFace.body['18SB']};
    padding: 14px 0 15px 0; // 너비는 사용하는 컴포넌트에서 조정
  `,
  medium: css`
    ${theme.typeFace.subTitle[20]};
    padding: 19px 0px 21px 0px;
  `,
};

export const Button = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width};

  &:disabled {
    ${disabledStyle}
  }

  ${({ $color }) => colorStyles[$color]}
  ${({ $size }) => sizeStyles[$size]}
`;
