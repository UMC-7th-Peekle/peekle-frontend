import * as S from './style';
import { Suspense, memo } from 'react';
import {
  BottomSheet,
  BottomSheetTabs,
  EventMap,
  DeferredLoader,
} from '@/components';
import { BOTTOM_SHEET_ID_EVENT_FILTER } from '@/constants/event';
import { useMapStore } from '@/stores';

const MemoizedEventMap = memo(EventMap);

const EventMapContainer = ({
  isSearchPage = false,
}: {
  isSearchPage?: boolean;
}) => {
  const { isLoading, loadingMessage } = useMapStore();

  return (
    <>
      <Suspense
        fallback={
          <S.LoadingContainer $isSearchPage={isSearchPage}>
            <DeferredLoader text={loadingMessage} />
          </S.LoadingContainer>
        }
      >
        <MemoizedEventMap isSearchPage={isSearchPage} />
      </Suspense>
      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_FILTER}>
        <BottomSheetTabs />
      </BottomSheet>
      {isLoading && (
        <S.LoadingContainer $isSearchPage={isSearchPage}>
          <DeferredLoader text={loadingMessage} />
        </S.LoadingContainer>
      )}
    </>
  );
};

export default EventMapContainer;
