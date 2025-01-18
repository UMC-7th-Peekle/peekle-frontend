import * as S from './BottomSheetTabs.styles';
import { useTabsStore, alert } from '@/stores';

import { Tabs } from '@/components';
import Sort from './Sort/Sort';
import Category from './Category/Category';
// import Duration from './Duration/Duration';
import Price from './Price/Price';
import Location from './Location/Location';

export const BottomSheetTabs = () => {
  const { activeTab } = useTabsStore();

  return (
    <>
      <Tabs defaultValue={activeTab} option="이벤트 필터 탭">
        <Tabs.List>
          <Tabs.Trigger value={'sort'} label="정렬" />
          <Tabs.Trigger value={'category'} label="카테고리" />
          <Tabs.Trigger value={'duration'} label="기간" />
          <Tabs.Trigger value={'price'} label="비용" />
          <Tabs.Trigger value={'location'} label="지역" />
        </Tabs.List>
        <Tabs.Panel value={'sort'}>
          <Sort />
        </Tabs.Panel>
        <Tabs.Panel value={'category'}>
          <Category />
        </Tabs.Panel>
        <Tabs.Panel value={'duration'}>
          <div>요소3</div>
        </Tabs.Panel>
        <Tabs.Panel value={'price'}>
          <Price />
        </Tabs.Panel>
        <Tabs.Panel value={'location'}>
          <Location />
        </Tabs.Panel>
      </Tabs>
      <S.BtnContainer>
        <S.IconBtn>
          <S.ResetIcon />
          <S.ResetText>초기화</S.ResetText>
        </S.IconBtn>
        <button
          onClick={() => {
            alert('활동 보기');
          }}
        >
          {} 개 활동 보기
        </button>
      </S.BtnContainer>
    </>
  );
};

export default BottomSheetTabs;
