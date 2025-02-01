import styled from 'styled-components';
import FilterButtonSVG from '@/assets/images/event/mao/FilterButton.svg?react';

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  padding: 8px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  z-index: 101; // 네이버 지도 위
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  padding: 0px 20px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

export const FilterButton = styled(FilterButtonSVG)`
  width: 48px;
  height: 48px;
`;
