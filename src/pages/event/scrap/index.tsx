import * as S from './style';
import { Suspense } from 'react';
import {
  Backward,
  CategoryChips,
  EventListSkeleton,
  EventScrapList,
} from '@/components';

const EventScrapPage = () => {
  return (
    <S.EventScrapContainer>
      <S.Header>
        <Backward />
        <S.Title>찜한 이벤트</S.Title>
      </S.Header>
      <S.CategoryFilterWrapper>
        <CategoryChips />
      </S.CategoryFilterWrapper>
      <Suspense fallback={<EventListSkeleton />}>
        <EventScrapList />
      </Suspense>
    </S.EventScrapContainer>
  );
};

export default EventScrapPage;
