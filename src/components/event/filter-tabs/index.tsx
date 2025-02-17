import * as S from './style';
import { useEffect } from 'react';
import { FilterTabsProps } from '@/types/event';
import { useFilterTabsStore } from '@/stores';
import List from './components/List';
import Trigger from './components/Trigger';
import Panel from './components/Panel';

const FilterTabs = ({ option, defaultValue, children }: FilterTabsProps) => {
  const { setSelectedValue, setOption } = useFilterTabsStore();

  useEffect(() => {
    setSelectedValue(defaultValue);
    setOption(option);
  }, [defaultValue, option, setSelectedValue, setOption]);

  const isAdminPage = option === '관리자 탭';

  return (
    <S.TabsContainer $isAdminPage={isAdminPage}>{children}</S.TabsContainer>
  );
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
 * <Tabs defaultValue={'duration'} option="이벤트 필터 탭">
    <Tabs.List>
      <Tabs.Trigger value={'duration'} label="기간" />
      <Tabs.Trigger value={'price'} label="비용" />
      <Tabs.Trigger value={'location'} label="지역" />
    </Tabs.List>
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
