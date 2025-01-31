import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { EventList, Filter, CategoryChips } from '@/components';
import Header from '@/layouts/header';

const EventPage = () => {
  const navigate = useNavigate();
  return (
    <S.EventPageContainer>
      <S.HeaderContainer>
        <Header page="event" />
        <CategoryChips />
        <Filter />
      </S.HeaderContainer>
      <EventList />
      <S.GoToMapButton onClick={() => navigate('/event/map')} />
    </S.EventPageContainer>
  );
};

export default EventPage;
