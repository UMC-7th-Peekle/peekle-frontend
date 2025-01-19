import * as S from './EventList.styles';
import { useQueryState } from 'nuqs';
import { EventCard } from '@/components';
import { events } from '@/sample-data/event';

const EventList = () => {
  // 필터 상태
  const [sortQuery] = useQueryState('sort');
  const [categoryQuery] = useQueryState('category');
  const [durationQuery] = useQueryState('duration');
  const [priceQuery] = useQueryState('price');
  const [locationQuery] = useQueryState('location');

  const filteredEvents = events.filter((event) => {
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

    return true;
  });

  // 정렬
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortQuery === 'latest') {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }
    if (sortQuery === 'lowest_price') {
      return Number(a.price) - Number(b.price);
    }
    if (sortQuery === 'shortest_distance') {
      // 거리 계산 필요
      // return a.distance - b.distance;
    }
    return 0;
  });

  console.log(sortedEvents);
  return (
    <S.Container>
      {sortedEvents.length > 0 ? (
        sortedEvents.map((event, index) => (
          <EventCard
            key={`${event.title} - ${index}`} // 일단 하드 코딩 해 놓음 나중엔 id 넘길 것임
            category={event.category}
            date={event.date}
            time={event.time}
            location={event.location}
            center={event.center}
            price={event.price}
            images={event.images}
            title={event.title}
            description={event.description}
            startDate={event.startDate}
            endDate={event.endDate}
          />
        ))
      ) : (
        <S.EmptyText>선택하신 조건에 맞는 행사가 없습니다.</S.EmptyText>
      )}
    </S.Container>
  );
};

export default EventList;
