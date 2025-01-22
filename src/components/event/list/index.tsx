import * as S from './style';
import { useQueryState } from 'nuqs';
import { EventCard } from '@/components';
import { useEventFilter } from '@/hooks';
import { EventData } from '@/types/event';
const EventList = ({ isSearchPage = false }: { isSearchPage?: boolean }) => {
  const { sortedEvents } = useEventFilter();
  const [searchQuery] = useQueryState('event-search');

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
        sortedEvents.map((event: EventData) => (
          <EventCard
            key={event.id}
            id={event.id}
            onClick={() => handleCardClick()}
          />
        ))
      ) : (
        <S.EmptyContainer>
          {isSearchPage ? (
            <>
              <S.WarningIcon />
              <S.EmptyText>검색 결과가 없습니다.</S.EmptyText>
            </>
          ) : (
            <S.EmptyText>선택하신 조건에 맞는 행사가 없습니다.</S.EmptyText>
          )}
        </S.EmptyContainer>
      )}
    </S.Container>
  );
};

export default EventList;
