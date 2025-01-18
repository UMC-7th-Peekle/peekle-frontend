import * as S from './Category.styles';
import { useQueryState } from 'nuqs';
import { CATEGORY_OPTIONS } from '@/constants/common';

const Category = () => {
  const [categoryValue, setCategoryValue] = useQueryState('category');

  return CATEGORY_OPTIONS.map(([label, value]) => (
    <S.Button
      key={value}
      onClick={() => setCategoryValue(value)}
      $isActive={value === categoryValue}
    >
      {label}
    </S.Button>
  ));
};

export default Category;
