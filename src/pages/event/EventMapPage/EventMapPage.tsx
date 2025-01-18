import * as S from './EventMapPage.styles';
import { EventCard, Select, BottomSheet, BottomSheetTabs } from '@/components';
import { events } from '@/sample-data/event';

export const EventMapPage = () => {
  return (
    <S.EventPageContainer>
      <S.SelectWapper>
        <Select
          option={'sort'}
          defaultValue={'latest'}
          defaultLabel={'가까운 날짜순'}
        />
        <Select
          option={'category'}
          defaultValue={'all'}
          defaultLabel={'카테고리'}
        />
        <Select
          option={'duration'}
          defaultValue={'all'}
          defaultLabel={'기간'}
        />
        <Select option={'price'} defaultValue={'all'} defaultLabel={'비용'} />
        <Select
          option={'location'}
          defaultValue={'all'}
          defaultLabel={'지역'}
        />
      </S.SelectWapper>
      <BottomSheet>
        <BottomSheetTabs />
      </BottomSheet>
      {events.map((event, index) => (
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
    </S.EventPageContainer>
  );
};

export default EventMapPage;
