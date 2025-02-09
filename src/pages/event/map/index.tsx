import * as S from './style';
import { useCallback } from 'react';
import {
  BottomSheet,
  BottomSheetTabs,
  MapHeader,
  EventMap,
  DeferredLoader,
} from '@/components';
import { BOTTOM_SHEET_ID_EVENT_FILTER } from '@/constants/event';
import { useMapStore } from '@/stores';

const EventMapPage = () => {
  const { isLoading, loadingMessage, setIsLoading, setLoadingMessage } =
    useMapStore();
  const handleMapLoad = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage('');
  }, [setIsLoading, setLoadingMessage]);

  return (
    <section>
      <EventMap onMapLoad={handleMapLoad} />
      <MapHeader />
      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_FILTER}>
        <BottomSheetTabs />
      </BottomSheet>
      {isLoading && (
        <S.LoadingContainer>
          <DeferredLoader text={loadingMessage} />
        </S.LoadingContainer>
      )}
    </section>
  );
};

export default EventMapPage;
