import styled from 'styled-components';

export const LoadingContainer = styled.div<{ $isSearchPage: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ $isSearchPage, theme }) =>
    $isSearchPage ? theme.color.gray[0] : 'rgba(255, 255, 255, 0.5)'};
  z-index: 2;
`;
