import * as S from './style';
import useEventFilter from '@/hooks/event/useEventFilter';
import useFilterTabsStore from '@/stores/event/useFilterTabsStore';
import useBottomSheetStore from '@/stores/common/useBottomSheetStore';
import useFilteredEventStore from '@/stores/event/useFilteredEventStore';

import { FilterTabs, Button } from '@/components';
import Duration from './duration';
import Price from './price';
import Location from './location';

export const BottomSheetTabs = () => {
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { filteredEvent } = useFilteredEventStore();
  const { clearFilter } = useEventFilter();
  const { selectedValue } = useFilterTabsStore();
  console.log('selectedValue', selectedValue);

  // console.log(filteredEvent);
  return (
    <S.Container>
      <S.Header>
        <S.Title>{selectedValue}</S.Title>
        <S.XIcon onClick={() => setActiveBottomSheet(null)} />
      </S.Header>
      <FilterTabs defaultValue={'기간'} option="이벤트 필터 탭">
        <FilterTabs.List>
          <FilterTabs.Trigger value={'기간'} label="기간" />
          <FilterTabs.Trigger value={'비용'} label="비용" />
          <FilterTabs.Trigger value={'지역'} label="지역" />
        </FilterTabs.List>
        <FilterTabs.Panel value={'기간'}>
          <Duration />
        </FilterTabs.Panel>
        <FilterTabs.Panel value={'비용'}>
          <Price />
        </FilterTabs.Panel>
        <FilterTabs.Panel value={'지역'}>
          <Location />
        </FilterTabs.Panel>
      </FilterTabs>
      <S.BtnContainer>
        <Button color="none" size="small" width="106px" onClick={clearFilter}>
          <S.ClearWrapper>
            <S.ClearIcon />
            <span>초기화</span>
          </S.ClearWrapper>
        </Button>
        <Button
          color="black"
          size="small"
          width="266px"
          onClick={() => {
            setActiveBottomSheet(null);
          }}
        >
          {filteredEvent.length}개 활동 보기
        </Button>
      </S.BtnContainer>
    </S.Container>
  );
};

export default BottomSheetTabs;
