import styled from 'styled-components';

export const HeaderContainer = styled.section`
  width: 100%;
`;

export const EventPageContainer = styled.section`
  width: 100%;
  height: 100%;
`;

export const TestTitle = styled.div`
  max-width: 300px;
  ${({ theme }) => theme.typeFace.body['15B']};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
