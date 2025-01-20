import { ListContainer } from '../style';
import { useTabsContext } from '../context/tabsContext';
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
