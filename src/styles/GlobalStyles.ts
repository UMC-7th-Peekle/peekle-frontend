import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import mediaQuery from './mediaQuery';
import designTokens from './designTokens';

const GlobalStyles = createGlobalStyle`
  ${reset};

  :root {
    ${({ theme }) => designTokens(theme)}
  }

  * {
    box-sizing: border-box;

    // 임시 스크롤바 스타일
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.color.gray['200']};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.color.gray['400']};
      border-radius: ${({ theme }) => theme.borderRadius.md};
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.color.gray['500']};
      cursor: pointer;
    }
  }

  body {
    font-family:
      'Pretendard',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    
    background: ${({ theme }) => theme.color.gray['0']};
    ${({ theme }) => theme.typeFace.body['18R']};
    color: ${({ theme }) => theme.color.gray['500']};
  
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
  }

  p, h1, h2, h3, h4, div, span {
    word-break: keep-all; // 단어 단위 줄바꿈
  }

  input {
    outline: none;
    border: none;
    background: ${({ theme }) => theme.color.gray['50']};
  }
  
  button {
    border: none;
    padding: 0;
    display: inline-block;
    background: transparent;
    cursor: pointer;
  }

  img {
    display: block;
  }

  ${mediaQuery.tablet`
    body {
      ${({ theme }) => theme.typeFace.subTitle['20']};
      ${({ theme }) => theme.color.primary['400']};
    }
  `}
`;

export default GlobalStyles;
