import * as S from './style';
import { useEffect, useMemo } from 'react';
import { useQueryState } from 'nuqs';
import { EventCard } from '@/components';
import { events } from '@/sample-data/event';
import { useMyLocationStore } from '@/stores';
import { calculateDistance } from '@/utils';
import { useFilteredEventStore } from '@/stores';

const EventList = ({ isSearchPage = false }: { isSearchPage?: boolean }) => {
  // 필터 상태
  const [sortQuery] = useQueryState('sort');
  const [categoryQuery] = useQueryState('category');
  const [durationQuery] = useQueryState('duration');
  const [priceQuery] = useQueryState('price');
  const [locationQuery] = useQueryState('location');

  const [searchQuery] = useQueryState('q');

  const { myLocation } = useMyLocationStore();
  const { filteredEvent, setFilteredEvent } = useFilteredEventStore(); // 전역 필터딩 행사들

  // 필터링된 이벤트를 useMemo로 메모이제이션
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 카테고리 필터
      if (categoryQuery && categoryQuery !== 'all') {
        const categories = categoryQuery.split(',');
        if (!categories.includes(event.category)) return false;
      }

      // 기간 필터
      if (durationQuery && durationQuery !== 'all') {
        const [startFilter, endFilter] = durationQuery
          .split(',')
          .map((date) => new Date(date));
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);

        if (eventStart < startFilter || eventEnd > endFilter) return false;
      }

      // 가격 필터
      if (priceQuery && priceQuery !== 'all') {
        if (priceQuery === 'free') {
          if (event.price !== 'free') return false;
        } else {
          if (Number(event.price) <= 0) return false;
        }
      }

      // 지역 필터
      if (locationQuery && locationQuery !== 'all') {
        const locations = locationQuery.split(',');
        if (!locations.includes(event.location)) return false;
      }

      // 검색어 필터
      if (searchQuery && searchQuery.length >= 2) {
        if (!event.title.includes(searchQuery)) return false;
      }

      return true;
    });
  }, [categoryQuery, durationQuery, priceQuery, locationQuery, searchQuery]);

  // 정렬된 이벤트도 useMemo로 메모이제이션
  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      if (sortQuery === 'latest' && myLocation) {
        const startDateDiff =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        if (startDateDiff !== 0) return startDateDiff;
        const endDateDiff =
          new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        if (endDateDiff !== 0) return endDateDiff;
        // 시작/종료 시간이 같으면 거리순
        const distanceA = calculateDistance(
          myLocation.latitude,
          myLocation.longitude,
          a.latitude,
          a.longitude,
        );
        const distanceB = calculateDistance(
          myLocation.latitude,
          myLocation.longitude,
          b.latitude,
          b.longitude,
        );
        return distanceA - distanceB;
      }

      if (sortQuery === 'lowest_price') {
        const priceDiff = Number(a.price) - Number(b.price);
        if (priceDiff !== 0) return priceDiff;
        // 가격이 같으면 가까운 날짜 순
        const startDateDiff =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        if (startDateDiff !== 0) return startDateDiff;
        const endDateDiff =
          new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        if (endDateDiff !== 0) return endDateDiff;
      }
      if (sortQuery === 'shortest_distance' && myLocation) {
        const distanceA = calculateDistance(
          myLocation.latitude,
          myLocation.longitude,
          a.latitude,
          a.longitude,
        );
        const distanceB = calculateDistance(
          myLocation.latitude,
          myLocation.longitude,
          b.latitude,
          b.longitude,
        );
        if (distanceA !== distanceB) return distanceA - distanceB;
        // 거리가 같으면 가까운 날짜순
        const startDateDiff =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        if (startDateDiff !== 0) return startDateDiff;
        const endDateDiff =
          new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        if (endDateDiff !== 0) return endDateDiff;
      }
      return 0;
    });
  }, [filteredEvents, sortQuery, myLocation]);

  // 필터링/정렬된 결과를 전역 상태에 반영
  useEffect(() => {
    setFilteredEvent(sortedEvents);
  }, [filteredEvent, sortedEvents, setFilteredEvent]);

  const handleCardClick = () => {
    if (isSearchPage) {
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
        sortedEvents.map((event) => (
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
