import styled from 'styled-components';

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

export const FullWidthItem = styled.div`
  grid-column: span 2;
`;
