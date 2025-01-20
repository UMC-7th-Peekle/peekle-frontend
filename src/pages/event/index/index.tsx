import * as S from './style';
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
