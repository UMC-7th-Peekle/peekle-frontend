import { theme } from '@/styles/theme';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import XSVG from '@/assets/images/icons/X.svg?react';
import RecentSVG from '@/assets/images/icons/recent.svg?react';
import NoRecentSearchSVG from '@/assets/images/null/noRecentSearch.svg?react';
import mediaQuery from '@/styles/mediaQuery';

export const BottomSheetContainer = styled(motion.div)`
  background-color: ${theme.color.gray[0]};
  position: absolute;
  width: 100%;
  min-height: 100%;
`;

export const BottomSheetHeader = styled.header`
  user-select: none;
`;

export const BottomSheetContent = styled.div`
  padding: 0 20px;
  margin-top: 12px;
  overflow-y: auto;
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

export const GotoMapBtnWrapper = styled(motion.div)`
  position: fixed;
  right: 15px;
  bottom: 20px;
`;
