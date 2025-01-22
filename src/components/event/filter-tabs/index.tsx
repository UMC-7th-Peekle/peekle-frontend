import * as S from './style';
import { FilterTabsProps } from '@/types/event';
import useFilterTabsStore from './store/useFilterTabsStore';
import List from './components/List';
import Trigger from './components/Trigger';
import Panel from './components/Panel';
import { useEffect } from 'react';

const FilterTabs = ({ option, defaultValue, children }: FilterTabsProps) => {
  const { setSelectedValue, setOption } = useFilterTabsStore();

  useEffect(() => {
    setSelectedValue(defaultValue);
    setOption(option);
  }, [defaultValue, option, setSelectedValue, setOption]);

  return <S.TabsContainer>{children}</S.TabsContainer>;
};

FilterTabs.List = List;
FilterTabs.Trigger = Trigger;
FilterTabs.Panel = Panel;

export default FilterTabs;

/**
 * 사용 예시
 * import { FilterTabs } from '@/components'
 * import { useFilterTabsStore } from '@/stores';
 * 
 * const { activeTab } = useFilterTabsStore(); // 전역 상태로 선택됨 탭 관리
 * 
 * <Tabs defaultValue={activeTab} option="이벤트 필터 탭">
    <Tabs.List>
      <Tabs.Trigger value={'sort'} label="정렬" onClick={handleSortTabClick} /> //onClick은 선택입니다
      <Tabs.Trigger value={'category'} label="카테고리" />
      <Tabs.Trigger value={'duration'} label="기간" />
      <Tabs.Trigger value={'price'} label="비용" />
      <Tabs.Trigger value={'location'} label="지역" />
    </Tabs.List>
    <Tabs.Panel value={'sort'}>
      <div>요소1</div>
    </Tabs.Panel>
    <Tabs.Panel value={'category'}>
      <div>요소2</div>
    </Tabs.Panel>
    <Tabs.Panel value={'duration'}>
      <div>요소3</div>
    </Tabs.Panel>
    <Tabs.Panel value={'price'}>
      <div>요소4</div>
    </Tabs.Panel>
    <Tabs.Panel value={'location'}>
      <div>요소5</div>
    </Tabs.Panel>
  </Tabs>
 */
