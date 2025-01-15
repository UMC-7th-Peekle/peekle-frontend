import styled from 'styled-components';
import SearchSVG from '@/assets/images/search.svg?react';

export const SearchIcon = styled(SearchSVG)`
  width: 40px; /* 원하는 크기 설정 */
  height: 40px;
`;

export const Wrapper = styled.div`
  padding: 20px;
  font-family: 'Pretendard', sans-serif;

  h1 {
    font-weight: 900; /* Black */
    font-size: 32px;
    margin-bottom: 10px;
  }

  h2 {
    font-weight: 800; /* ExtraBold */
    font-size: 28px;
    margin-bottom: 10px;
  }

  h3 {
    font-weight: 700; /* Bold */
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-weight: 400; /* Regular */
    font-size: 16px;
    margin-bottom: 10px;
  }

  span {
    font-weight: 300; /* Light */
    font-size: 14px;
  }

  .extra-light {
    font-weight: 200; /* ExtraLight */
    font-size: 14px;
  }

  .thin {
    font-weight: 100; /* Thin */
    font-size: 12px;
  }
`;
