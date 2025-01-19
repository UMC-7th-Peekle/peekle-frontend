import * as S from './EventPage.styles';
import { EventList, Selects } from '@/components';

const EventPage = () => {
  return (
    <S.EventPageContainer>
      <Selects />
      <EventList />
    </S.EventPageContainer>
  );
};

export default EventPage;
