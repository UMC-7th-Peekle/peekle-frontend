import { TriggerBtn } from '../style';
import { FilterTabsTriggerProps } from '@/types/event';
import useFilterTabsStore from '@/stores/event/useFilterTabsStore';

const Trigger = ({ value, label, onClick }: FilterTabsTriggerProps) => {
  const { selectedValue, setSelectedValue, option } = useFilterTabsStore();
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
