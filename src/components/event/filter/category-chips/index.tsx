import * as S from './style';
import { useEventFilter } from '@/hooks';
import { Chip } from '@/components';
import { CATEGORY_OPTIONS } from '@/constants/event';

export const CategoryChips = () => {
  const { handleSelect, storedValue } = useEventFilter({
    key: '카테고리',
    type: 'multiple',
  });

  const decodedValue = storedValue.replace('%2C', ',');

  return (
    <S.CategoryChipsContainer>
      {CATEGORY_OPTIONS.map((value) => (
        <Chip
          key={value}
          label={value}
          value={value}
          isActive={decodedValue.split(',').includes(value)}
          onSelect={() => handleSelect(value)}
        />
      ))}
    </S.CategoryChipsContainer>
  );
};

export default CategoryChips;
