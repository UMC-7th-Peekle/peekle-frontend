import 'styled-components';
import { Theme } from './theme';
import { FlattenSimpleInterpolation } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    color: {
      primary: {
        '900': string;
        '800': string;
        '700': string;
        '600': string;
        '500': string;
        '400': string;
        '300': string;
        '200': string;
        '100': string;
        '50': string;
      };
      gray: {
        '900': string;
        '600': string;
        '500': string;
        '400': string;
        '200': string;
        '100': string;
        '50': string;
        '0': string;
      };
      sementic: {
        blue: string;
        yellow: string;
        red: string;
      };
    };
    typeFace: {
      title: FlattenSimpleInterpolation;
      subTitle: {
        '28': FlattenSimpleInterpolation;
        '24': FlattenSimpleInterpolation;
        '22': FlattenSimpleInterpolation;
        '20': FlattenSimpleInterpolation;
      };
      body: {
        '18SB': FlattenSimpleInterpolation;
        '18R': FlattenSimpleInterpolation;
        '16SB': FlattenSimpleInterpolation;
        '16R': FlattenSimpleInterpolation;
        '15B': FlattenSimpleInterpolation;
        '15M': FlattenSimpleInterpolation;
      };
      caption: {
        '14B': FlattenSimpleInterpolation;
        '14R': FlattenSimpleInterpolation;
        '13B': FlattenSimpleInterpolation;
        '13R': FlattenSimpleInterpolation;
        '12B': FlattenSimpleInterpolation;
        '12R': FlattenSimpleInterpolation;
      };
    };
    borderRadius: {
      xsm: string; //4px
      sm: string; //8px
      md: string; //10px
      lg: string; //16px
      xlg: string; //50px
      xxlg: string; //50%
    };
  }
}
