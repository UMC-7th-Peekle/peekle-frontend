import * as S from './style';
import { SORT_OPTIONS } from '@/constants/event';
import useEventFilter from '@/hooks/event/useEventFilter';

const Sort = () => {
  const { handleSelect, isSelected } = useEventFilter({
    key: 'sort',
    type: 'single',
  });

  return (
    <S.Container>
      {SORT_OPTIONS.map(([label, value]) => (
        <S.Button
          key={value}
          onClick={() => handleSelect(value)}
          $isActive={isSelected(value)}
        >
          {label}
        </S.Button>
      ))}
    </S.Container>
  );
};

export default Sort;
