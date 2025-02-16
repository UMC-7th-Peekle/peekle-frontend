import styled from 'styled-components';

export const CategoryChipsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin: 8px -16px 8px 0;
  z-index: 1;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
