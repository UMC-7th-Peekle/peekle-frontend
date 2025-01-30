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
import CategoryChips from './category-chips';

const Filter = () => {
  const { storedValue } = useEventFilter({
    key: '정렬',
    type: 'single',
  });

  const { setActiveBottomSheet } = useBottomSheetStore();

  return (
    <>
      <CategoryChips />
      <S.FilterContainer>
        <S.FilterWrapper>
          <S.FiltersWrapper
            onClick={() => setActiveBottomSheet(BOTTOM_SHEET_ID_EVENT_FILTER)}
          >
            <S.HamburgerIcon />
            <S.FilterText>필터</S.FilterText>
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
