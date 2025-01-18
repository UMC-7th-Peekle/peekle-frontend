import * as S from './Category.styles';
import useEventFilter from '@/hooks/event/useEventFilter';
import { CATEGORY_OPTIONS } from '@/constants/event';

const Category = () => {
  const { handleSelect, isSelected } = useEventFilter({
    key: 'category',
    type: 'multiple',
  });

  return (
    <S.Container>
      {CATEGORY_OPTIONS.map(([label, value]) => (
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

export default Category;
