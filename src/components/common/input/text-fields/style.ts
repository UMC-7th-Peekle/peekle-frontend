import styled from 'styled-components';
import Search from '@/assets/images/icons/search.svg?react';
import Delete from '@/assets/images/icons/delete.svg?react';
import { theme } from '@/styles/theme';
import mediaQuery from '@/styles/mediaQuery';

export const SearchWrapper = styled.div<{
  max_width?: number;
  min_width?: number;
  $page?: 'eventMap' | '';
}>`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  max-width: ${({ max_width }) => (max_width ? `${max_width}px` : '333px')};
  min-width: ${({ min_width }) => (min_width ? `${min_width}px` : '300px')};
  background-color: ${({ $page }) =>
    $page === 'eventMap' ? theme.color.gray[0] : theme.color.gray[50]};
  border-radius: 10px;
  padding: 0 20px;
  box-sizing: border-box;
  box-shadow: ${({ $page }) =>
    $page === 'eventMap' && '0px 0px 8px 0px rgba(0, 0, 0, 0.2)'};
`;

export const SearchInput = styled.input<{ $page?: 'eventMap' | '' }>`
  height: 48px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
  ${theme.typeFace.body['16R']}
  background-color: ${({ $page }) =>
    $page === 'eventMap' ? theme.color.gray[0] : theme.color.gray[50]};

  &::-webkit-search-cancel-button {
    display: none;
  }

  &::placeholder {
    color: ${({ $page }) =>
      $page === 'eventMap' ? theme.color.gray[500] : theme.color.gray[400]};
    font-size: 16px;
    font-weight: 400;
  }
`;

export const SearchIcon = styled(Search)<{ $page?: 'eventMap' | '' }>`
  width: 26px;
  height: 26px;
  margin-right: 8px;
  flex-shrink: 0;

  path {
    stroke: ${({ $page }) =>
      $page === 'eventMap' ? theme.color.gray[500] : theme.color.gray[400]};
  }

  ${mediaQuery.sMobile`
    width: 20px;
    height: 20px;
  `};
`;

export const DeleteIcon = styled(Delete)`
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:hover path {
    stroke: ${theme.color.gray['400']};
  }
`;
