import * as S from './style';
import { Suspense } from 'react';
import {
  EventList,
  EventListSkeleton,
  Filter,
  CategoryChips,
} from '@/components';
import Header from '@/layouts/header';

const EventListWithFilter = () => {
  return (
    <>
      <Header page="event" />
      <S.HeaderContainer>
        <CategoryChips />
        <Filter />
      </S.HeaderContainer>
      <Suspense fallback={<EventListSkeleton />}>
        <EventList />
      </Suspense>
    </>
  );
};

export default EventListWithFilter;
