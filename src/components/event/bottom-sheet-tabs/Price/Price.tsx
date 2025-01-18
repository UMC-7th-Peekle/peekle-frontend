import * as S from './Price.styles';
import { useQueryState } from 'nuqs';
import { PRICE_OPTIONS } from '@/constants/common';

const Price = () => {
  const [priceValue, setPriceValue] = useQueryState('price');

  return PRICE_OPTIONS.map(([label, value]) => (
    <S.Button
      key={value}
      onClick={() => setPriceValue(value)}
      $isActive={value === priceValue}
    >
      {label}
    </S.Button>
  ));
};

export default Price;
