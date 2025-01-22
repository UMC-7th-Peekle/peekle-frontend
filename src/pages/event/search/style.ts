import { theme } from '@/styles/theme';
import styled from 'styled-components';
import XSVG from '@/assets/images/icons/X.svg?react';

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
  margin-top: 24px;
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
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: ${theme.color.gray[600]};
`;

export const EmptyText = styled.p`
  margin: 96px auto 0;
  text-align: center;
  ${theme.typeFace.body['18R']}
  color: ${theme.color.gray[400]};
`;
