import { DefaultTheme } from 'styled-components';

export type CSSValue =
  | string
  | number
  | ((theme: DefaultTheme) => string | number)
  | null
  | undefined;

export interface MediaQueryProps {
  [key: string]: number;
}
