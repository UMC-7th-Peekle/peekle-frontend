import * as S from './style';
import { Suspense } from 'react';
import {
  Backward,
  CategoryChips,
  EventList,
  EventListSkeleton,
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
        <EventList page={'scrap'} />
      </Suspense>
    </S.EventScrapContainer>
  );
};

export default EventScrapPage;
