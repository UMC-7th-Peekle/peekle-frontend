import styled from 'styled-components';
import { theme } from '@/styles/theme';
import NoFilteredResultSVG from '@/assets/images/null/noFilteredResult.svg?react';
import NoSearchResultSVG from '@/assets/images/null/noSearchResult.svg?react';

export const Container = styled.section``;

export const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 0;
  gap: 18px;
`;

export const EmptyContainer = styled.div`
  align-self: center;
  margin-top: 56px;
`;

export const NoSearchResult = styled(NoSearchResultSVG)``;
export const NoFilteredResult = styled(NoFilteredResultSVG)``;

export const EmptyText = styled.p`
  ${theme.typeFace.body['18R']}
  color: ${theme.color.gray[400]};
`;
