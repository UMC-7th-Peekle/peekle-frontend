import * as S from './style';
import { MapBottomSheet, FilterChips, EventMap, EventCard } from '@/components';
import { useMapStore } from '@/stores';
import { BOTTOM_SHEET_ID_EVENT_INFO } from '@/constants/event';

const EventMapPage = () => {
  const { selectedEvent } = useMapStore();

  return (
    <S.Container>
      <FilterChips />
      <EventMap />
      <MapBottomSheet id={BOTTOM_SHEET_ID_EVENT_INFO}>
        <EventCard id={selectedEvent?.id as string} />
      </MapBottomSheet>
    </S.Container>
  );
};

export default EventMapPage;
