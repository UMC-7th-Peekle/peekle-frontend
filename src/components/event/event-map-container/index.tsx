import * as S from './style';
import { useCallback } from 'react';
import {
  BottomSheet,
  BottomSheetTabs,
  EventMap,
  DeferredLoader,
} from '@/components';
import { BOTTOM_SHEET_ID_EVENT_FILTER } from '@/constants/event';
import { useMapStore } from '@/stores';

const EventMapContainer = ({
  isSearchPage = false,
}: {
  isSearchPage?: boolean;
}) => {
  const { isLoading, loadingMessage, setIsLoading, setLoadingMessage } =
    useMapStore();

  const handleMapLoad = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage('');
  }, [setIsLoading, setLoadingMessage]);

  return (
    <>
      <EventMap onMapLoad={handleMapLoad} isSearchPage={isSearchPage} />
      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_FILTER}>
        <BottomSheetTabs />
      </BottomSheet>
      {isLoading && (
        <S.LoadingContainer>
          <DeferredLoader text={loadingMessage} />
        </S.LoadingContainer>
      )}
    </>
  );
};

export default EventMapContainer;
