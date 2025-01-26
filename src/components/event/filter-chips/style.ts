import styled from 'styled-components';
import LineSVG from '@/assets/images/icons/vertical-line.svg?react';

export const filterChipsContainer = styled.div`
  width: calc(100% + 32px);
  margin: 0 -16px; // 패딩 영역 밖으로 확장
  padding-left: 20px;
  display: flex;
  gap: 16px;
  align-items: center;
  white-space: nowrap; // 내부 요소들 줄바꿈되지 않게
`;

export const LineIcon = styled(LineSVG)`
  width: 5px;
  height: 20px;
`;

export const FilterChipsWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding-right: 20px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none; // 스크롤바 숨기기
  }
`;
