import * as S from './style';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EventCard, EventCardSkeleton, RoundedButton } from '@/components';
import { useEventFilter, useGetEvents, useInfiniteScroll } from '@/hooks';
import { EventData } from '@/types/event';
import { ROUTES } from '@/constants/routes';
import { useMapStore, useMyLocationStore } from '@/stores';

export const EventList = ({
  page = 'index',
}: {
  page?: 'search' | 'index';
}) => {
  const navigate = useNavigate();
  const { formattedFilters } = useEventFilter();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('event-search') ?? '';
  const { setSelectedEvent } = useMapStore();
  const { myLocation } = useMyLocationStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetEvents(
    {
      ...formattedFilters,
      lat: myLocation?.y,
      lng: myLocation?.x,
    },
  );

  const { lastElementRef } = useInfiniteScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  const events = data.pages.flatMap((page) => page.success?.events ?? []) ?? [];

  // console.log('events in list', events);

  const isSearchPage = page === 'search';
  const isAdmin = false;

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

  const handleGotoMapBtnClick = () => {
    setSelectedEvent(null); // 선택돼있는 이벤트 풀기
    // 정렬 삭제 후 쿼리 재호출
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('sort');
    setSearchParams(newSearchParams);
    navigate({
      pathname: ROUTES.EVENT_MAP,
      search: newSearchParams.toString(), // 현재 쿼리 파람 유지
    });
  };

  const handleAddEventBtnClick = () => {
    navigate(ROUTES.EVENT_CREATE);
  };

  return (
    <section>
      {events.length > 0 ? (
        <>
          <S.EventsContainer>
            {events.map((event: EventData, index, events) => (
              <EventCard
                key={event.eventId}
                id={event.eventId}
                eventCardData={event}
                onClick={handleCardClick}
                ref={index === events.length - 1 ? lastElementRef : null}
              />
            ))}
          </S.EventsContainer>
          {!isSearchPage && (
            <S.GotoMapBtnWrapper>
              <RoundedButton
                icon="map"
                text="지도 보기"
                onClick={handleGotoMapBtnClick}
              />
            </S.GotoMapBtnWrapper>
          )}
          {isAdmin && (
            <S.GotoMapBtnWrapper>
              <RoundedButton
                icon="plus"
                text="이벤트 추가하기"
                onClick={handleAddEventBtnClick}
              />
            </S.GotoMapBtnWrapper>
          )}
        </>
      ) : (
        <S.EmptyContainer>
          {isSearchPage ? <S.NoSearchResult /> : <S.NoFilteredResult />}
        </S.EmptyContainer>
      )}
    </section>
  );
};

export const EventListSkeleton = () => {
  return (
    <section>
      <S.EventsContainer>
        {Array.from({ length: 10 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </S.EventsContainer>
    </section>
  );
};
