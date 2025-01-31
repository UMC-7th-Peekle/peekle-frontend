import * as S from './style';
import { MapBottomSheet, Filter, EventMap, EventCard } from '@/components';
import { useMapStore, useBottomSheetStore } from '@/stores';
import { BOTTOM_SHEET_ID_EVENT_INFO } from '@/constants/event';

const EventMapPage = () => {
  const { selectedEvent } = useMapStore();
  const { setActiveBottomSheet } = useBottomSheetStore();

  return (
    <S.Container>
      <S.HeaderContainer>
        <Filter />
      </S.HeaderContainer>
      <EventMap />
      <MapBottomSheet id={BOTTOM_SHEET_ID_EVENT_INFO}>
        <EventCard
          onClick={() => setActiveBottomSheet(null)}
          id={selectedEvent?.eventId as bigint}
        />
      </MapBottomSheet>
    </S.Container>
  );
};

export default EventMapPage;
