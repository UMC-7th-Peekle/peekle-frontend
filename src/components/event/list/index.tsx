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
        localStorage.getItem('recent-event-search') ?? '[]',
      );
      localStorage.setItem(
        'recent-event-search',
        JSON.stringify([...new Set([searchQuery, ...recentSearch])]),
      );
    }
  };

  return (
    <S.Container>
      {/*검색 결과 없어도 필터는 유지 - 필터 때문에 검색 결과 없는 걸수도 있음*/}
      {isSearchPage && <Filter isSearchPage={true} />}
      {sortedEvents.length > 0 ? (
        <>
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
