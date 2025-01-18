import * as S from './EventPage.styles';
import { EventCard, BottomSheet, Tabs, Select } from '@/components';
import { events } from '@/sample-data/event';
import { useTabsStore } from '@/stores';

export const EventPage = () => {
  const { activeTab } = useTabsStore();

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
        <Tabs defaultValue={activeTab} option="이벤트 필터 탭">
          <Tabs.List>
            <Tabs.Trigger value={'sort'} label="정렬" />
            <Tabs.Trigger value={'category'} label="카테고리" />
            <Tabs.Trigger value={'duration'} label="기간" />
            <Tabs.Trigger value={'price'} label="비용" />
            <Tabs.Trigger value={'location'} label="지역" />
          </Tabs.List>
          <Tabs.Panel value={'sort'}>
            <div>요소1</div>
          </Tabs.Panel>
          <Tabs.Panel value={'category'}>
            <div>요소2</div>
          </Tabs.Panel>
          <Tabs.Panel value={'duration'}>
            <div>요소3</div>
          </Tabs.Panel>
          <Tabs.Panel value={'price'}>
            <div>요소4</div>
          </Tabs.Panel>
          <Tabs.Panel value={'location'}>
            <div>요소5</div>
          </Tabs.Panel>
        </Tabs>
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
