import { PanelContainer } from '../Tabs.styles';
import { useTabsContext } from '../context/TabsContext';
import { TabPanelProps } from '@/types/common';

const Panel = ({ value, children }: TabPanelProps) => {
  const { selectedValue, option } = useTabsContext();

  if (value !== selectedValue) return null;

  return (
    <PanelContainer
      id={`${option}-panel-${value}`}
      role="tabpanel"
      aria-labelledby={`${option}-trigger-${value}`}
    >
      {children}
    </PanelContainer>
  );
};

export default Panel;
