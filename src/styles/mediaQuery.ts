import { css } from 'styled-components';
import { CSSValue, MediaQueryProps } from '@/types/style';
import { theme } from './theme';

const breakpoints: MediaQueryProps = {
  xsMobile: 360,
  sMobile: 400,
  mobile: 420,
  tablet: 800,
  laptop: 1600,
  desktop: 2560,
} as const;

const mediaQuery = Object.keys(breakpoints).reduce(
  (acc, label) => {
    acc[label] = (strings: TemplateStringsArray, ...values: CSSValue[]) => css`
      @media (max-width: ${breakpoints[label]}px) {
        /* ${css`
          ${strings[0]}${values.join('')}
        `} */
        ${css(
          strings,
          ...values.map((v) => (typeof v === 'function' ? v(theme) : v)),
        )}
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
