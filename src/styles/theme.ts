import { DefaultTheme, css } from 'styled-components';
import mediaQuery from './mediaQuery';

export const theme: DefaultTheme = {
  color: {
    primary: {
      '900': '#0b190f',
      '800': '#1b3c23',
      '700': '#2a5f38',
      '600': '#3a834d',
      '500': '#4aa662',
      '400': '#67bb7d',
      '300': '#8bcb9b',
      '200': '#aedbba',
      '100': '#d1ebd8',
      '50': '#f4faf6',
    },
    gray: {
      '900': '#000000',
      '600': '#464b53',
      '500': '#74777d',
      '400': '#9ea4a9',
      '200': '#cacdd3',
      '100': '#eaeced',
      '50': '#f6f8fa',
      '0': '#ffffff',
    },
    sementic: {
      blue: '#1855da',
      yellow: '#ffc041',
      red: '#ec132e',
    },
  },
  typeFace: {
    title: css`
      font-weight: 700;
      font-size: 2rem;
      line-height: 1.6;
      letter-spacing: -0.02rem;
    `,
    subTitle: {
      '28': css`
        font-weight: 700;
        font-size: 2rem;
        line-height: 1.6;
        letter-spacing: -0.02rem;
      `,
      '24': css`
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 1.6;
        letter-spacing: -0.02rem;
      `,
      '22': css`
        font-weight: 700;
        font-size: 1.375rem;
        line-height: 1.6;
        letter-spacing: -0.02rem;
      `,
      '20': css`
        font-weight: 600;
        font-size: 1.25rem;
        line-height: 1.6;
        letter-spacing: -0.02rem;
      `,
    },
    body: {
      '18SB': css`
        font-weight: 600;
        font-size: 1.125rem;
        line-height: 1.5;
        letter-spacing: -0.02;
      `,
      '18R': css`
        font-weight: 400;
        font-size: 1.125rem;
        line-height: 1.7;
        letter-spacing: -0.02rem;
      `,
      '16SB': css`
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.5;
        letter-spacing: -0.02rem;
      `,
      '16R': css`
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.5;
        letter-spacing: -0.02rem;
      `,
      '15M': css`
        font-weight: 500;
        font-size: 0.9375rem;
        line-height: 1.5;
        letter-spacing: -0.02rem;
      `,
    },
    caption: {
      '14B': css`
        font-weight: 700;
        font-size: 0.875rem;
        line-height: 1.35;
        letter-spacing: -0.02rem;
      `,
      '14R': css`
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.35;
        letter-spacing: -0.02rem;
      `,
      '13B': css`
        font-weight: 700;
        font-size: 0.8125rem;
        line-height: 1.35;
        letter-spacing: -0.02rem;
      `,
      '13R': css`
        font-weight: 400;
        font-size: 0.8125rem;
        line-height: 1.35;
        letter-spacing: -0.02rem;
      `,
      '12B': css`
        font-weight: 700;
        font-size: 0.75rem;
        line-height: 1.35;
        letter-spacing: -0.02rem;
      `,
      '12R': css`
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.35;
        letter-spacing: -0.02rem;
      `,
    },
  },
  borderRadius: {
    sm: '8px',
    md: '10px',
    lg: '16px',
    xlg: '50px',
    xxlg: '50%',
  },
  ...mediaQuery,
} as const;
