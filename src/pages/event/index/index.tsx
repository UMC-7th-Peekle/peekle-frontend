import * as S from './style';
import { EventList, Filter, CategoryChips } from '@/components';
import Header from '@/layouts/header';

const EventPage = () => {
  return (
    <S.EventPageContainer>
      <S.HeaderContainer>
        <Header page="event" />
        <CategoryChips />
        <Filter />
      </S.HeaderContainer>
      <EventList />
    </S.EventPageContainer>
  );
};

export default EventPage;
