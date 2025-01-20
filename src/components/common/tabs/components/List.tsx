import { ListContainer } from '../Tabs.style';
import { useTabsContext } from '../context/tabs-context';
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
