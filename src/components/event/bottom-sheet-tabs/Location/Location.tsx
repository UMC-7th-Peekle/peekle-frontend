import * as S from './Location.styles';
import { LOCATION_OPTIONS } from '@/constants/event';
import useEventFilter from '@/hooks/event/useEventFilter';

const Location = () => {
  const { handleSelect, isSelected } = useEventFilter({
    key: 'location',
    type: 'multiple',
  });

  return (
    <S.Container>
      {LOCATION_OPTIONS.map(([label, value]) => (
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

export default Location;
