import * as S from './style';
import { Suspense } from 'react';
import {
  EventList,
  EventListSkeleton,
  Filter,
  CategoryChips,
} from '@/components';
import Header from '@/layouts/header';

const EventPage = () => {
  return (
    <S.EventPageContainer>
      <S.HeaderContainer>
        <Header page="event" />
        <CategoryChips />
        <Filter />
      </S.HeaderContainer>
      <Suspense fallback={<EventListSkeleton />}>
        <EventList />
      </Suspense>
    </S.EventPageContainer>
  );
};

export default EventPage;
