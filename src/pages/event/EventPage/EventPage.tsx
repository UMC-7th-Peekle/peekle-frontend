import * as S from './EventPage.styles';
import { EventCard, Select, BottomSheet, BottomSheetTabs } from '@/components';
import { events } from '@/sample-data/event';

export const EventPage = () => {
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
      <BottomSheet>
        <BottomSheetTabs />
      </BottomSheet>
    </S.EventPageContainer>
  );
};

export default EventPage;
