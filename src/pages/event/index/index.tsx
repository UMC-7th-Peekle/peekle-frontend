import * as S from './style';
import { EventList, FilterChips } from '@/components';

const EventPage = () => {
  return (
    <S.EventPageContainer>
      <FilterChips />
      <EventList />
    </S.EventPageContainer>
  );
};

export default EventPage;
