import * as S from './style';
import { useQueryState } from 'nuqs';
import { useNavigate } from 'react-router-dom';
import { EventCard, Filter } from '@/components';
import { useEventFilter } from '@/hooks';
import { EventData } from '@/types/event';
import { ROUTES } from '@/constants/routes';

const EventList = ({
  page = 'index',
}: {
  page?: 'search' | 'scrap' | 'index';
}) => {
  const navigate = useNavigate();
  const { sortedEvents } = useEventFilter();
  const [searchQuery] = useQueryState('event-search', { defaultValue: '' });

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
          <S.GoToMapButton
            role="button"
            aria-label="지도보기 버튼"
            $isSearchPage={isSearchPage}
            onClick={() => navigate(ROUTES.EVENT_MAP)}
          />
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
