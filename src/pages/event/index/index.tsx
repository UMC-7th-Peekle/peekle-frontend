import * as S from './style';
import { EventList, FilterChips } from '@/components';
import { SearchBar } from '@/layouts/search-bar';

const EventPage = () => {
  return (
    <S.EventPageContainer>
      <S.HeaderContainer>
        <SearchBar queryKey="event-search" placeholder="관심있는 활동 검색" />
        <FilterChips />
      </S.HeaderContainer>
      <EventList />
    </S.EventPageContainer>
  );
};

export default EventPage;
