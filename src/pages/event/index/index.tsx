import * as S from './style';
import { EventList, Filter } from '@/components';
import Header from '@/layouts/header';

const EventPage = () => {
  return (
    <S.EventPageContainer>
      <S.HeaderContainer>
        <Header page="event" />
        <Filter />
      </S.HeaderContainer>
      <EventList />
    </S.EventPageContainer>
  );
};

export default EventPage;
