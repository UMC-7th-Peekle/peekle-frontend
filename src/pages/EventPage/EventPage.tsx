import * as S from './EventPage.styles';
import { EventCard, BottomSheet } from '@/components';
import { events } from '@/sample-data/event';
import useBottomSheetStore from '@/stores/common/useBottomSheetStore';

export const EventPage = () => {
  const { setIsBottomSheetOpen } = useBottomSheetStore();

  return (
    <S.EventPageContainer>
      <button onClick={() => setIsBottomSheetOpen(true)}>바템시트 열기</button>
      <BottomSheet>{'dddd'}</BottomSheet>
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
