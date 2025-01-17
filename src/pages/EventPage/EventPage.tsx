import * as S from './EventPage.styles';
import { EventCard, BottomSheet, Tabs, Chip } from '@/components';
import { events } from '@/sample-data/event';
import useBottomSheetStore from '@/stores/common/useBottomSheetStore';

export const EventPage = () => {
  const { setIsBottomSheetOpen } = useBottomSheetStore();

  const handleSortTabClick = () => {
    console.log('sort 탭 클릭');
  };

  return (
    <S.EventPageContainer>
      <button onClick={() => setIsBottomSheetOpen(true)}>바템시트 열기</button>
      <Chip
        label={'전체'}
        value={'all'}
        selectedValue={'all'}
        onSelect={(value: string) => console.log(`${value} 선택됨`)}
      />
      <Chip
        label={'오늘'}
        value={'today'}
        selectedValue={'all'}
        onSelect={() => console.log('오늘 선택됨')}
      />
      <BottomSheet>
        <Tabs defaultValue={'sort'} option="이벤트 필터 탭">
          <Tabs.List>
            <Tabs.Trigger
              value={'sort'}
              label="정렬"
              onClick={handleSortTabClick}
            />
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
