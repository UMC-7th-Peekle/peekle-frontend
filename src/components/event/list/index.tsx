import * as S from './style';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  EventCard,
  EventCardSkeleton,
  Filter,
  RoundedButton,
} from '@/components';
import { useEventFilter, useGetEvents } from '@/hooks';
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

  const { data, fetchNextPage, hasNextPage, isFetching } = useGetEvents({
    ...formattedFilters,
  });

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (
      document.documentElement.clientWidth +
        document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetching, handleScroll]);

  useEffect(() => {
    if (isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  console.log(data);
  const events = data.pages.flatMap((page) => page.success?.events ?? []) ?? [];
  console.log(events);

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
      {events.length > 0 ? (
        <>
          <S.EventsContainer>
            {events.map((event: EventData) => (
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

export const EventListSkeleton = () => {
  return (
    <S.Container>
      {Array.from({ length: 5 }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </S.Container>
  );
};
