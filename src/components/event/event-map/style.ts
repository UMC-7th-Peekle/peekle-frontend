import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const MapContainer = styled.div<{ $isSearchPage?: boolean }>`
  width: 100vw;
  height: ${({ $isSearchPage }) =>
    $isSearchPage
      ? 'calc(100vh - var(--search-header-height))'
      : 'calc(100vh - var(--nav-height))'};
  margin-left: ${({ $isSearchPage }) => ($isSearchPage ? '0' : '-16px')};
  position: absolute;
  top: ${({ $isSearchPage }) =>
    $isSearchPage ? 'var(--search-header-height)' : '0'};
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

export const BottomContainer = styled.div<{
  $isSearchPage: boolean;
  $hasSelectedEvent: boolean;
}>`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
  bottom: ${({ $isSearchPage, $hasSelectedEvent }) =>
    !$isSearchPage
      ? 'calc(20px + var(--nav-height))'
      : $hasSelectedEvent
        ? '20px'
        : 'calc(20px + var(--search-bottom-sheet-height))'};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EventCardWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 16px;
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.color.gray[0]};
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.16);
`;
