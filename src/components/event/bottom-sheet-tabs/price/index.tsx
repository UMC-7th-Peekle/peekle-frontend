import * as S from './style';
import { PRICE_OPTIONS } from '@/constants/event';
import { CheckItem } from '@/components/event/check-item';
import useEventFilter from '@/hooks/event/useEventFilter';

const Price = () => {
  const { handleSelect, isSelected } = useEventFilter({
    key: '가격',
    type: 'single',
  });

  return (
    <S.Container>
      {PRICE_OPTIONS.map((value) => (
        <CheckItem
          key={value}
          text={value}
          onClick={() => handleSelect(value)}
          isActive={isSelected(value)}
        />
      ))}
    </S.Container>
  );
};

export default Price;
