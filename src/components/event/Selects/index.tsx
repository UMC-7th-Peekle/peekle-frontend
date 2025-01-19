import * as S from './style';
import { BottomSheet, Select, BottomSheetTabs } from '@/components';
import { BOTTOM_SHEET_ID_EVENT_FILTER } from '@/constants/event';

const Selects = () => {
  return (
    <>
      <S.SelectWapper>
        <Select
          key={'sort'}
          option={'sort'}
          defaultValue={'latest'}
          defaultLabel={'가까운 날짜순'}
        />
        <Select
          key={'category'}
          option={'category'}
          defaultValue={'all'}
          defaultLabel={'카테고리'}
        />
        <Select
          key={'duration'}
          option={'duration'}
          defaultValue={'all'}
          defaultLabel={'기간'}
        />
        <Select
          key={'price'}
          option={'price'}
          defaultValue={'all'}
          defaultLabel={'비용'}
        />
        <Select
          key={'location'}
          option={'location'}
          defaultValue={'all'}
          defaultLabel={'지역'}
        />
      </S.SelectWapper>
      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_FILTER}>
        <BottomSheetTabs />
      </BottomSheet>
    </>
  );
};

export default Selects;
