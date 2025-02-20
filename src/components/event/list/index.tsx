import * as S from './style';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EventCard, EventCardSkeleton, RoundedButton } from '@/components';
import { useEventFilter, useGetEvents, useInfiniteScroll } from '@/hooks';
import { EventData } from '@/types/event';
import { ROUTES } from '@/constants/routes';
import { useMapStore } from '@/stores';

export const EventList = ({
  page = 'index',
}: {
  page?: 'search' | 'scrap' | 'index';
}) => {
  const navigate = useNavigate();
  const { formattedFilters } = useEventFilter();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('event-search') ?? '';
  const { setSelectedEvent } = useMapStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetEvents(
    {
      ...formattedFilters,
    },
  );

  const { lastElementRef } = useInfiniteScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  const events = data.pages.flatMap((page) => page.success?.events ?? []) ?? [];

  const isSearchPage = page === 'search';
  const isScrapPage = page === 'scrap';
  const isAdmin = true;

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
    navigate(ROUTES.EVENT_MAP);
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
                eventData={event}
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
          {isSearchPage ? (
            <S.NoSearchResult />
          ) : isScrapPage ? (
            <S.NoLikeResult />
          ) : (
            <S.NoFilteredResult />
          )}
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
