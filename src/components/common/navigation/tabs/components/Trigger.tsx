import { TriggerBtn } from '../style';
import { TabTriggerProps } from '@/types/common';
import { useTabsContext } from '../context/tabsContext';

const Trigger = ({ value, label, onClick }: TabTriggerProps) => {
  const { selectedValue, setSelectedValue, option } = useTabsContext();
  const isActive = selectedValue === value;

  const onSelect = () => {
    setSelectedValue(value);
    if (onClick) onClick();
  };

  return (
    <TriggerBtn
      id={`${option}-trigger-${value}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`${option}-panel-${value}`}
      onClick={onSelect}
      $isActive={isActive}
    >
      {label}
    </TriggerBtn>
  );
};

export default Trigger;
