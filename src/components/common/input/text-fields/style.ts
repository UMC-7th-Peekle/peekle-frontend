import styled from 'styled-components';
import Search from '@/assets/images/icons/search.svg?react';
import Delete from '@/assets/images/icons/delete.svg?react';
import { theme } from '@/styles/theme';

export const SearchWrapper = styled.div<{
  max_width?: number;
  min_width?: number;
}>`
  display: flex;
  align-items: center;
  position: relative;
  max-width: ${({ max_width }) => (max_width ? `${max_width}px` : '333px')};
  min-width: ${({ min_width }) => (min_width ? `${min_width}px` : '300px')};
  background-color: ${({ theme }) => theme.color.gray['50']};
  border-radius: 10px;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const SearchInput = styled.input`
  height: 48px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
  ${theme.typeFace.body['16R']}

  &::-webkit-search-cancel-button {
    display: none;
  }

  &::placeholder {
    color: ${theme.color.gray['400']};
    font-size: 16px;
    font-weight: 400;
  }
`;

export const SearchIcon = styled(Search)`
  width: 26px;
  height: 26px;
  margin-right: 8px;

  path {
    stroke: ${theme.color.gray['400']};
  }
`;

export const DeleteIcon = styled(Delete)`
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:hover path {
    stroke: ${theme.color.gray['400']};
  }
`;
