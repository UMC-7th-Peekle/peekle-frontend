import { FilterTabsPanelProps } from '@/types/event';
import { PanelContainer } from '../style';
import useFilterTabsStore from '@/stores/event/useFilterTabsStore';

const Panel = ({ value, children }: FilterTabsPanelProps) => {
  const { selectedValue, option } = useFilterTabsStore();

  if (value !== selectedValue) return null;

  const isAdminPage = option === '관리자 탭';
  console.log('isAdminPage', isAdminPage);

  return (
    <PanelContainer
      id={`${option}-panel-${value}`}
      role="tabpanel"
      aria-labelledby={`${option}-trigger-${value}`}
      $isAdminPage={isAdminPage}
    >
      {children}
    </PanelContainer>
  );
};

export default Panel;
