import * as S from './style';
import { Suspense, lazy } from 'react';
import {
  BottomSheet,
  BottomSheetTabs,
  MapHeader,
  DeferredLoader,
} from '@/components';
import { BOTTOM_SHEET_ID_EVENT_FILTER } from '@/constants/event';

const EventMap = lazy(() => import('@/components/event/event-map'));

const EventMapPage = () => {
  return (
    <S.Container>
      <Suspense fallback={<DeferredLoader />}>
        <EventMap />
      </Suspense>
      <MapHeader />
      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_FILTER}>
        <BottomSheetTabs />
      </BottomSheet>
    </S.Container>
  );
};

export default EventMapPage;
