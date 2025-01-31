import * as S from './style';
import { useQueryState } from 'nuqs';
import { EventCard, Filter } from '@/components';
import { useEventFilter } from '@/hooks';
import { EventData } from '@/types/event';

const EventList = ({
  page = 'index',
}: {
  page?: 'search' | 'scrap' | 'index';
}) => {
  const { sortedEvents } = useEventFilter();
  const [searchQuery] = useQueryState('event-search');

  const isSearchPage = page === 'search';
  const isScrapPage = page === 'scrap';

  const handleCardClick = () => {
    if (isSearchPage) {
      // 검색 페이지 리스트에서 항목 클릭시 검색어에 저장
      const recentSearch = JSON.parse(
        localStorage.getItem('recent-search') ?? '[]',
      );
      localStorage.setItem(
        'recent-search',
        JSON.stringify([...new Set([searchQuery, ...recentSearch])]),
      );
    }
  };

  return (
    <S.Container>
      {sortedEvents.length > 0 ? (
        <>
          {isSearchPage && <Filter isSearchPage={true} />}
          <S.EventsContainer>
            {sortedEvents.map((event: EventData) => (
              <EventCard
                key={event.eventId}
                id={event.eventId}
                onClick={handleCardClick}
              />
            ))}
          </S.EventsContainer>
        </>
      ) : (
        <S.EmptyContainer>
          {isSearchPage ? (
            <S.NoSearchResult />
          ) : isScrapPage ? (
            <S.NoLikeResult />
          ) : (
            <S.NoFilteredResult />
          )}
        </S.EmptyContainer>
      )}
    </S.Container>
  );
};

export default EventList;
