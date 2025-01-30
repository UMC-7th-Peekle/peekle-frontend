import * as S from './style';
import { EventList, FilterChips } from '@/components';
import Header from '@/layouts/header';

const EventPage = () => {
  return (
    <S.EventPageContainer>
      <S.HeaderContainer>
        <Header page="event" />
        <FilterChips />
      </S.HeaderContainer>
      <EventList />
    </S.EventPageContainer>
  );
};

export default EventPage;
