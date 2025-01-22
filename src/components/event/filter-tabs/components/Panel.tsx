import { PanelContainer } from '../style';
import { FilterTabsPanelProps } from '@/types/event';
import useFilterTabsStore from '../store/useFilterTabsStore';

const Panel = ({ value, children }: FilterTabsPanelProps) => {
  const { selectedValue, option } = useFilterTabsStore();

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
