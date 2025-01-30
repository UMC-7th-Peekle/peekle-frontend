import styled, { css } from 'styled-components';
import { StyledButtonProps } from '@/types/common';
import { theme } from '@/styles/theme';
import mediaQuery from '@/styles/mediaQuery';

// 공동 disabled 스타일
const disabledStyle = css`
  cursor: not-allowed;
  pointer-events: none;
  background-color: ${theme.color.gray[100]};
`;

const colorStyles = {
  black: css`
    background: ${theme.color.gray[900]};
    color: ${theme.color.gray[0]};
  `,
  primary400Line: css`
    background: none;
    color: ${theme.color.primary[400]};
    border: 1px solid ${theme.color.primary[400]};
  `,
  primary500: css`
    background: ${theme.color.primary[500]};
    color: ${theme.color.gray[0]};
  `,
  primary500Line: css`
    background: none;
    color: ${theme.color.primary[500]};
  `,
  primary700: css`
    background: ${theme.color.primary[700]};
    color: ${theme.color.gray[0]};
  `,
  gray50: css`
    background: ${theme.color.gray[50]};
    color: ${theme.color.gray[600]};
  `,
  gray50TextGray400: css`
    background: ${theme.color.gray[50]};
    color: ${theme.color.gray[400]};
  `,
  yellow: css`
    background: #fee500;
    color: rgba(0, 0, 0, 0.85);
  `,
  none: css`
    background: none;
    color: ${theme.color.gray[400]};
  `,
};

const sizeStyles = {
  xsmall: css`
    border-radius: ${theme.borderRadius.xlg};
    ${theme.typeFace.body['16SB']};
    padding: 10px 44px; // 실제 너비는 사용하는 컴포넌트에서 조정

    ${mediaQuery.sMobile`
      ${theme.typeFace.caption['13B']};
    `}
  `,
  small: css`
    border-radius: ${theme.borderRadius.sm};
    ${theme.typeFace.body['18SB']};
    padding: 14px 0px 15px 0px; // 실제 너비는 사용하는 컴포넌트에서 조정

    ${mediaQuery.sMobile`
      ${theme.typeFace.caption['14B']};
    `}
  `,
  medium: css`
    border-radius: ${theme.borderRadius.sm};
    ${theme.typeFace.body['18SB']};
    padding: 16px 24px;

    ${mediaQuery.sMobile`
      ${theme.typeFace.caption['14B']};
    `}
  `,
  large: css`
    ${theme.typeFace.subTitle[20]};
    padding: 19px 0px 21px 0px;

    ${mediaQuery.sMobile`
      ${theme.typeFace.body['18SB']};
    `}
  `,
};

export const Button = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  max-width: ${({ $width }) => $width};

  &:disabled {
    ${disabledStyle}
  }

  ${({ $color }) => colorStyles[$color]}
  ${({ $size }) => sizeStyles[$size]}
`;
