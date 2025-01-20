import * as S from './style';
import { useQueryState } from 'nuqs';
import { EventCard, Select, BottomSheet, BottomSheetTabs } from '@/components';
import { events } from '@/sample-data/event';

export const EventPage = () => {
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

  return (
    <S.EventPageContainer>
      <S.SelectWapper>
        <Select
          key={'sort'}
          option={'sort'}
          defaultValue={'latest'}
          defaultLabel={'가까운 날짜순'}
        />
        <Select
          key={'category'}
          option={'category'}
          defaultValue={'all'}
          defaultLabel={'카테고리'}
        />
        <Select
          key={'duration'}
          option={'duration'}
          defaultValue={'all'}
          defaultLabel={'기간'}
        />
        <Select
          key={'price'}
          option={'price'}
          defaultValue={'all'}
          defaultLabel={'비용'}
        />
        <Select
          key={'location'}
          option={'location'}
          defaultValue={'all'}
          defaultLabel={'지역'}
        />
      </S.SelectWapper>
      {sortedEvents.map((event, index) => (
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
      ))}
      <BottomSheet>
        <BottomSheetTabs />
      </BottomSheet>
    </S.EventPageContainer>
  );
};

export default EventPage;
