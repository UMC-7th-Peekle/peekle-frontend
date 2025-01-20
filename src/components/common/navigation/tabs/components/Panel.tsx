import { PanelContainer } from '../style';
import { useTabsContext } from '../context/tabsContext';
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
