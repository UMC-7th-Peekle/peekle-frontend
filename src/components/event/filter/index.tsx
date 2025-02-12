import * as S from './style';
import BottomSheet from '@/components/common/information/bottom-sheet';
import BottomSheetTabs from '../bottom-sheet-tabs';
import BottomSheetSort from '../bottom-sheet-sort';
import useEventFilter from '@/hooks/event/useEventFilter';
import useBottomSheetStore from '@/stores/common/useBottomSheetStore';
import {
  BOTTOM_SHEET_ID_EVENT_FILTER,
  BOTTOM_SHEET_ID_EVENT_SORT,
} from '@/constants/event';

const Filter = ({ isSearchPage = false }: { isSearchPage?: boolean }) => {
  const { storedValue, activeFilterCount } = useEventFilter({
    key: '정렬',
    type: 'single',
  });

  const { setActiveBottomSheet } = useBottomSheetStore();

  return (
    <>
      <S.FilterContainer $isSearchPage={isSearchPage}>
        <S.FilterWrapper>
          <S.FiltersWrapper
            onClick={() => setActiveBottomSheet(BOTTOM_SHEET_ID_EVENT_FILTER)}
          >
            <S.HamburgerIcon />
            {activeFilterCount > 0 ? (
              <S.FillerTextWrapper>
                <S.FilterText>필터 ({activeFilterCount}개)</S.FilterText>
                <S.RedDot />
              </S.FillerTextWrapper>
            ) : (
              <S.FilterText>필터</S.FilterText>
            )}
          </S.FiltersWrapper>
          <S.SortWrapper
            onClick={() => setActiveBottomSheet(BOTTOM_SHEET_ID_EVENT_SORT)}
          >
            <S.FilterText>{storedValue}</S.FilterText>
            <S.SortIcon />
          </S.SortWrapper>
        </S.FilterWrapper>
      </S.FilterContainer>
      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_SORT}>
        <BottomSheetSort />
      </BottomSheet>
      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_FILTER}>
        <BottomSheetTabs />
      </BottomSheet>
    </>
  );
};

export default Filter;
