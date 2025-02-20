import { css } from 'styled-components';
import { DefaultTheme } from 'styled-components';

// 추가로 필요한 css 변수 정의해주세요
const designTokens = (theme: DefaultTheme) => css`
  /* --css-variable-example: ${theme.color.primary['500']}; */
  --nav-height: 64px;
  --search-header-height: 64px;
  --search-bottom-sheet-height: 50px;
`;

export default designTokens;
