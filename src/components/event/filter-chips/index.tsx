import * as S from './style';
import {
  BottomSheet,
  Dropdown,
  FilterChip,
  BottomSheetTabs,
} from '@/components';
import { useEventFilter } from '@/hooks';
import { SORT_OPTIONS, BOTTOM_SHEET_ID_EVENT_FILTER } from '@/constants/event';

const FilterChips = () => {
  const { handleSelect, storedValue } = useEventFilter({
    key: 'sort',
    type: 'single',
  });

  const handleSortChange = (value: string) => {
    if (value !== storedValue) {
      handleSelect(value);
    }
  };

  return (
    <>
      <S.FilterChipsWrapper>
        <Dropdown
          list={SORT_OPTIONS}
          onSelect={(value) => handleSortChange(value)}
        />
        <FilterChip
          key={'category'}
          option={'category'}
          defaultValue={'all'}
          defaultLabel={'카테고리'}
        />
        <FilterChip
          key={'duration'}
          option={'duration'}
          defaultValue={'all'}
          defaultLabel={'기간'}
        />
        <FilterChip
          key={'price'}
          option={'price'}
          defaultValue={'all'}
          defaultLabel={'비용'}
        />
        <FilterChip
          key={'location'}
          option={'location'}
          defaultValue={'all'}
          defaultLabel={'지역'}
        />
      </S.FilterChipsWrapper>
      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_FILTER}>
        <BottomSheetTabs />
      </BottomSheet>
    </>
  );
};

export default FilterChips;
