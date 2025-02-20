import { theme } from '@/styles/theme';
import styled from 'styled-components';
import XSVG from '@/assets/images/icons/X.svg?react';
import NoRecentSearchSVG from '@/assets/images/null/noRecentSearch.svg?react';
import mediaQuery from '@/styles/mediaQuery';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Appbar = styled.div`
  height: 62px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const RecentSearchContainer = styled.section`
  margin-top: 16px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

export const RecentSearchRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const RecentSearchTitle = styled.h2`
  ${theme.typeFace.body['18SB']}
  color: ${theme.color.gray[900]};
`;

export const ClearButton = styled.button`
  ${theme.typeFace.caption['14R']}
  color: ${theme.color.gray[400]};
`;

export const RecentSearchTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
`;

export const RecentSearchText = styled.div`
  ${theme.typeFace.body['18R']}
  color: ${theme.color.gray[600]};
`;
export const XIcon = styled(XSVG)`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: ${theme.color.gray[200]};
`;
export const NoRecentSearch = styled(NoRecentSearchSVG)`
  margin-top: 56px;
  align-self: center;
  justify-self: center;

  ${mediaQuery.sMobile`
    margin-top: 0;
  `};
`;
