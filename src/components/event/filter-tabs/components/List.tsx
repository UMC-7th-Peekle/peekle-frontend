import { ListContainer } from '../style';
import useFilterTabsStore from '@/stores/event/useFilterTabsStore';
import { FilterTabsListProps } from '@/types/event';

const List = ({ children }: FilterTabsListProps) => {
  const { option } = useFilterTabsStore();

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
