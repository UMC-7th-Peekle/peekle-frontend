import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import HamburgerSVG from '@/assets/images/icons/hamburger.svg?react';
import SortSVG from '@/assets/images/icons/sort.svg?react';

export const FilterContainer = styled.div<{ $isSearchPage: boolean }>`
  width: 100vw;
  margin: ${({ $isSearchPage }) =>
    $isSearchPage ? '8px -16px 12px -16px' : '16px -16px 16px -16px'};
`;

export const FilterWrapper = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${theme.color.gray[100]};
  border-bottom: 1px solid ${theme.color.gray[100]};
`;

export const FiltersWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SortWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const FillerTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const FilterText = styled.h3`
  color: ${theme.color.gray[900]};
  ${theme.typeFace.body['16SB']};
`;

export const RedDot = styled.div`
  width: 6px;
  height: 6px;
  flex: 1 0 0;
  margin-top: -10px;
  border-radius: ${theme.borderRadius.xxlg};
  background-color: ${theme.color.sementic.red};
`;

const IconStyle = css`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: ${theme.color.gray[900]};
`;

export const HamburgerIcon = styled(HamburgerSVG)`
  ${IconStyle}
`;

export const SortIcon = styled(SortSVG)`
  ${IconStyle}
`;
