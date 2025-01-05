import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

/**
 * 글로벌 스타일
 * 폰트랑 디자인 토큰은 고정이라 스타일 컴포넌트가 아닌
 * styles/fonts.css, styles/designTokens.css에서 관리
 */
const GlobalStyles = createGlobalStyle`
  ${reset}
  
  body {
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
