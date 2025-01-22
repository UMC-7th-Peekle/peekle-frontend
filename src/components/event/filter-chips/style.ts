import styled from 'styled-components';

export const FilterChipsWrapper = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap; // 내부 요소들 줄바꿈되지 않게
  margin: 0 -16px; // 패딩 영역 밖으로 확장
  padding: 0 16px; // Wapper 내부 패딩

  &::-webkit-scrollbar {
    display: none; // 스크롤바 숨기기
  }
`;
