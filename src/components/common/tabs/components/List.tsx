import { ListContainer } from '../Tabs.styles';
import { useTabsContext } from '../context/TabsContext';
import { TabListProps } from '@/types/common';

const List = ({ children }: TabListProps) => {
  const { label } = useTabsContext();

  return (
    <ListContainer
      role="tablist"
      aria-label={label}
      aria-orientation="horizontal"
    >
      {children}
    </ListContainer>
  );
};

export default List;
