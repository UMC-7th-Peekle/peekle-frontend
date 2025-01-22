import * as S from './style';
import { useFilterTabsStore } from '@/stores';
import { useBottomSheetStore, useFilteredEventStore } from '@/stores';
import { useEventFilter } from '@/hooks';

import { FilterTabs } from '@/components';
import Category from './category';
import Duration from './duration';
import Price from './price';
import Location from './location';

export const BottomSheetTabs = () => {
  const { activeTab } = useFilterTabsStore();
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { filteredEvent } = useFilteredEventStore();
  const { clearFilter } = useEventFilter();

  return (
    <S.Container>
      <FilterTabs defaultValue={activeTab} option="이벤트 필터 탭">
        <FilterTabs.List>
          <FilterTabs.Trigger value={'category'} label="카테고리" />
          <FilterTabs.Trigger value={'duration'} label="기간" />
          <FilterTabs.Trigger value={'price'} label="비용" />
          <FilterTabs.Trigger value={'location'} label="지역" />
        </FilterTabs.List>
        <FilterTabs.Panel value={'category'}>
          <Category />
        </FilterTabs.Panel>
        <FilterTabs.Panel value={'duration'}>
          <Duration />
        </FilterTabs.Panel>
        <FilterTabs.Panel value={'price'}>
          <Price />
        </FilterTabs.Panel>
        <FilterTabs.Panel value={'location'}>
          <Location />
        </FilterTabs.Panel>
      </FilterTabs>
      <S.BtnContainer>
        <S.IconBtn onClick={clearFilter}>
          <S.ResetIcon />
          <S.ResetText>초기화</S.ResetText>
        </S.IconBtn>
        <button
          onClick={() => {
            setActiveBottomSheet(null);
          }}
        >
          {filteredEvent.length}개 활동 보기
        </button>
      </S.BtnContainer>
    </S.Container>
  );
};

export default BottomSheetTabs;
