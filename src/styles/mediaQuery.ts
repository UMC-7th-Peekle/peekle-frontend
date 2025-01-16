import { css } from 'styled-components';
import { CSSValue, MediaQueryProps } from '@/types/style';

const breakpoints: MediaQueryProps = {
  mobile: 420,
  tablet: 800,
  laptop: 1600,
  desktop: 2560,
} as const;

const mediaQuery = Object.keys(breakpoints).reduce(
  (acc, label) => {
    acc[label] = (strings: TemplateStringsArray, ...values: CSSValue[]) => css`
      @media (max-width: ${breakpoints[label]}px) {
        ${css`
          ${strings[0]}${values.join('')}
        `}
      }
    `;
    return acc;
  },
  {} as Record<
    keyof typeof breakpoints,
    (
      strings: TemplateStringsArray,
      ...values: CSSValue[]
    ) => ReturnType<typeof css>
  >,
);

export default mediaQuery;
