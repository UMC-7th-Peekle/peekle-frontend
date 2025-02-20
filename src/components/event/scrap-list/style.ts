import styled from 'styled-components';
import { theme } from '@/styles/theme';
import mediaQuery from '@/styles/mediaQuery';
import NoLikeResultSVG from '@/assets/images/null/noLike.svg?react';

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
  justify-self: center;
  margin-top: 56px;

  ${mediaQuery.sMobile`
    margin-top: 0;
  `};
`;

export const NoLikeResult = styled(NoLikeResultSVG)``;

export const EmptyText = styled.p`
  ${theme.typeFace.body['18R']}
  color: ${theme.color.gray[400]};
`;
