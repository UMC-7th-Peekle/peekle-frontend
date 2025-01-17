import { PanelContainer } from '../Tabs.styles';
import { useTabsContext } from '../context/TabsContext';
import { TabPanelProps } from '@/types/common';

const Panel = ({ value, children }: TabPanelProps) => {
  const { selectedKey, label } = useTabsContext();

  if (value !== selectedKey) return null;

  return (
    <PanelContainer
      id={`${label}-panel-${value}`}
      role="tabpanel"
      aria-labelledby={`${label}-trigger-${value}`}
    >
      {children}
    </PanelContainer>
  );
};

export default Panel;
