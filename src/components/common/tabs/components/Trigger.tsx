import { Btn, TabText } from '../Tabs.styles';
import { TabTriggerProps } from '@/types/common';
import { useTabsContext } from '../context/TabsContext';

const Trigger = ({ value, text, onClick }: TabTriggerProps) => {
  const { selectedKey, setSelectedKey, label } = useTabsContext();
  const isActive = selectedKey === value;

  const onSelect = () => {
    setSelectedKey(value);
    if (onClick) onClick();
  };

  return (
    <Btn
      id={`${label}-trigger-${value}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`${label}-panel-${value}`}
      onClick={onSelect}
    >
      <TabText $isActive={isActive}>{text}</TabText>
    </Btn>
  );
};

export default Trigger;
