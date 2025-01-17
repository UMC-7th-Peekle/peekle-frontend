import * as S from './Tabs.styles';
import { useState } from 'react';
import { TabsContext } from './context/TabsContext';
import { TabsProps } from '@/types/common';
import List from './components/List';
import Panel from './components/Panel';
import Trigger from './components/Trigger';

const Tabs = ({ label, defaultValue, children }: TabsProps) => {
  const [selectedKey, setSelectedKey] = useState(defaultValue);

  const providerValue = {
    selectedKey,
    setSelectedKey,
    label,
  };

  return (
    <TabsContext.Provider value={providerValue}>
      <S.TabsContainer>{children}</S.TabsContainer>
    </TabsContext.Provider>
  );
};

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Panel = Panel;

export default Tabs;

/**
 * 사용 예시
 * import { Tabs } from '@/components'
 * 
 * <Tabs defaultValue={'sort'} label="이벤트 필터 탭">
    <Tabs.List>
      <Tabs.Trigger value={'sort'} text="정렬" onClick={handleSortTabClick} /> //onClick은 선택입니다
      <Tabs.Trigger value={'category'} text="카테고리" />
      <Tabs.Trigger value={'duration'} text="기간" />
      <Tabs.Trigger value={'price'} text="비용" />
      <Tabs.Trigger value={'location'} text="지역" />
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
