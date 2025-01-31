import { theme } from '@/styles/theme';
import styled from 'styled-components';
import XSVG from '@/assets/images/icons/X.svg?react';
import RecentSVG from '@/assets/images/icons/recent.svg?react';
import NoRecentSearchSVG from '@/assets/images/null/noRecentSearch.svg?react';
import mediaQuery from '@/styles/mediaQuery';

export const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const SearchContainer = styled.section`
  width: 100%;
  height: 100%;
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

export const Left = styled.span`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`;

export const RecentIcon = styled(RecentSVG)`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: ${theme.color.gray[200]};
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
