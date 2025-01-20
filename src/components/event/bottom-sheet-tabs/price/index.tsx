import * as S from './style';
import { PRICE_OPTIONS } from '@/constants/event';
import useEventFilter from '@/hooks/event/useEventFilter';

const Price = () => {
  const { handleSelect, isSelected } = useEventFilter({
    key: 'price',
    type: 'single',
  });

  return (
    <S.Container>
      {PRICE_OPTIONS.map(([label, value]) => (
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

export default Price;
