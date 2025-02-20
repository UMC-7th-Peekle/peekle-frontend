import * as S from './style';
import { Suspense } from 'react';
import {
  AnimatePresence,
  useDragControls,
  useMotionValue,
} from 'framer-motion';
import {
  EventList,
  EventListSkeleton,
  Filter,
  RoundedButton,
} from '@/components';
import { useRecentSearch } from '@/hooks';
import { useSearchBottomSheetStore, useEventsStore } from '@/stores';

const DRAG_BUFFER = 30;
const bottomSheetVariants = {
  opened: { top: 'var(--search-header-height)' },
  closed: { top: `calc(100% - var(--search-bottom-sheet-height))` },
};
const goToMapBtnVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const SearchBottomSheet = () => {
  const {
    isSearched,
    recentSearch,
    handleClear,
    handleRemoveRecentSearch,
    handleRecentSearchClick,
  } = useRecentSearch({
    queryKey: 'event-search',
    localKey: 'recent-event-search',
  });

  // console.log('recentSearch', recentSearch);

  const { events } = useEventsStore();
  const { isSearchBSOpen, setIsSearchBSOpen } = useSearchBottomSheetStore();

  // 드래그 상태 관리
  const dragY = useMotionValue(0);
  const animateState = isSearchBSOpen ? 'opened' : 'closed';

  const dragControls = useDragControls();

  const handleDragEnd = () => {
    const y = dragY.get();
    // console.log('y', y);
    if (y <= -DRAG_BUFFER) setIsSearchBSOpen(true);
    else if (y > DRAG_BUFFER) setIsSearchBSOpen(false);
  };

  const handleGotoMapBtnClick = () => {
    setIsSearchBSOpen(false);
  };

  console.log('events', events);

  return (
    <>
      <AnimatePresence initial={false}>
        <S.BottomSheetContainer
          drag="y"
          dragConstraints={{
            top: 0,
            bottom: 0,
          }}
          dragElastic={0.5}
          style={{
            y: dragY,
          }}
          animate={animateState}
          variants={bottomSheetVariants}
          onDragEnd={handleDragEnd}
          dragControls={dragControls}
          dragListener={false}
        >
          {events.length > 0 && (
            <S.BottomSheetHeader onPointerDown={(e) => dragControls.start(e)}>
              <Filter isSearchPage={true} />
            </S.BottomSheetHeader>
          )}

          <S.BottomSheetContent>
            {!isSearched ? (
              recentSearch.length > 0 ? (
                <S.RecentSearchContainer>
                  <S.RecentSearchRow>
                    <S.RecentSearchTitle>최근 검색</S.RecentSearchTitle>
                    <S.ClearButton onClick={handleClear}>
                      전체 삭제
                    </S.ClearButton>
                  </S.RecentSearchRow>
                  <S.RecentSearchTextContainer>
                    {recentSearch.map((search: string, index: number) => (
                      <S.RecentSearchRow
                        key={`${search}-${index}`}
                        onClick={() => handleRecentSearchClick(search)}
                      >
                        <S.Left>
                          <S.RecentIcon />
                          <S.RecentSearchText>{search}</S.RecentSearchText>
                        </S.Left>
                        <S.XIcon
                          onClick={(e) => handleRemoveRecentSearch(search, e)}
                        />
                      </S.RecentSearchRow>
                    ))}
                  </S.RecentSearchTextContainer>
                </S.RecentSearchContainer>
              ) : (
                <S.EmptyContainer>
                  <S.NoRecentSearch />
                </S.EmptyContainer>
              )
            ) : (
              <Suspense fallback={<EventListSkeleton />}>
                <EventList page={'search'} />
              </Suspense>
            )}
          </S.BottomSheetContent>
        </S.BottomSheetContainer>
      </AnimatePresence>
      {isSearchBSOpen && events.length > 0 && (
        <S.GotoMapBtnWrapper
          variants={goToMapBtnVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <RoundedButton
            icon="map"
            text="지도 보기"
            onClick={handleGotoMapBtnClick}
          />
        </S.GotoMapBtnWrapper>
      )}
    </>
  );
};

export default SearchBottomSheet;
