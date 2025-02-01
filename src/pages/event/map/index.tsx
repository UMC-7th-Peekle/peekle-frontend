import * as S from './style';
import {
  BottomSheet,
  BottomSheetTabs,
  MapHeader,
  EventMap,
} from '@/components';
import { BOTTOM_SHEET_ID_EVENT_FILTER } from '@/constants/event';

const EventMapPage = () => {
  return (
    <S.Container>
      <EventMap />
      <MapHeader />
      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_FILTER}>
        <BottomSheetTabs />
      </BottomSheet>
    </S.Container>
  );
};

export default EventMapPage;
