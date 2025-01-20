import { ListContainer } from '../Tabs.styles';
import { useTabsContext } from '../context/TabsContext';
import { TabListProps } from '@/types/common';

const List = ({ children }: TabListProps) => {
  const { option } = useTabsContext();

  return (
    <ListContainer
      role="tablist"
      aria-label={option}
      aria-orientation="horizontal"
    >
      {children}
    </ListContainer>
  );
};

export default List;
