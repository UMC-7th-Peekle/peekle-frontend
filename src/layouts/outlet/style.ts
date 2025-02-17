import styled from 'styled-components';

export const MainContainer = styled.main<{ $shouldShowNavbar: boolean }>`
  min-height: 100vh; // 전체 높이 확보
  position: relative;
  padding: 0 16px;
  overflow-x: hidden; // y축 스크롤만 허용
  padding-bottom: ${({ $shouldShowNavbar }) =>
    $shouldShowNavbar ? 'var(--nav-height)' : '0'}; // Navibar에 안 가려지게
`;
