import mediaQuery from '@/styles/mediaQuery';
import styled from 'styled-components';

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  ${mediaQuery.sMobile`
    gap: 6px;
  `}
`;

export const FullWidthItem = styled.div`
  grid-column: span 2;
`;
