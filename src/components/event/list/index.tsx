import * as S from './style';
import { useQueryState } from 'nuqs';
import { useNavigate } from 'react-router-dom';
import { EventCard, Filter, RoundedButton } from '@/components';
import { useEventFilter } from '@/hooks';
import { EventData } from '@/types/event';
import { ROUTES } from '@/constants/routes';
import { useMapStore } from '@/stores';

const EventList = ({
  page = 'index',
}: {
  page?: 'search' | 'scrap' | 'index';
}) => {
  const navigate = useNavigate();
  const { sortedEvents } = useEventFilter();
  const [searchQuery] = useQueryState('event-search', { defaultValue: '' });
  const { setSelectedEvent } = useMapStore();

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
          <S.GotoMapBtnWrapper $isSearchPage={isSearchPage}>
            <RoundedButton
              icon="map"
              text="지도 보기"
              onClick={() => {
                setSelectedEvent(null); // 선택돼있는 이벤트 풀기
                navigate(ROUTES.EVENT_MAP);
              }}
            />
          </S.GotoMapBtnWrapper>
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
