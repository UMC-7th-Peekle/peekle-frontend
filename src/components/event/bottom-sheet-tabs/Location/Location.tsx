import * as S from './Location.styles';
import { useQueryState } from 'nuqs';
import { LOCATION_OPTIONS } from '@/constants/common';

const Location = () => {
  const [locationValue, setLocationValue] = useQueryState('location');

  return LOCATION_OPTIONS.map(([label, value]) => (
    <S.Button
      key={value}
      onClick={() => setLocationValue(value)}
      $isActive={value === locationValue}
    >
      {label}
    </S.Button>
  ));
};

export default Location;
