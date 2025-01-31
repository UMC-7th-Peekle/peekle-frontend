import styled from 'styled-components';
import Search from '@/assets/images/icons/search.svg?react';
import Delete from '@/assets/images/icons/delete.svg?react';
import { theme } from '@/styles/theme';

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 300px;
  background-color: ${theme.color.gray['50']};
  border-radius: ${theme.borderRadius.md};
  padding: 3px 16px;
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
