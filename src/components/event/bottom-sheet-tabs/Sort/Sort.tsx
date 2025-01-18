import * as S from './Sort.styles';
import { useQueryState } from 'nuqs';
import { SORT_OPTIONS } from '@/constants/common';

const Sort = () => {
  const [sortValue, setSortValue] = useQueryState('sort');

  return SORT_OPTIONS.map(([label, value]) => (
    <S.Button
      key={value}
      onClick={() => setSortValue(value)}
      $isActive={value === sortValue}
    >
      {label}
    </S.Button>
  ));
};

export default Sort;
