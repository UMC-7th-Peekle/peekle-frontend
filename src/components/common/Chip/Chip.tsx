import * as S from './Chip.styles';
import { ChipProps } from '@/types/common';

const Chip = ({ label, value, selectedValue, onSelect }: ChipProps) => {
  const isActive = selectedValue === value;

  return (
    <S.Chip
      key={label}
      aria-label={label}
      aria-pressed={isActive}
      $isActive={isActive}
      onClick={() => onSelect(value)}
    >
      {label}
    </S.Chip>
  );
};

export default Chip;

/** 사용 예시
 *
 * <Chip
    label={'전체'}
    value={'all'}
    selectedValue={'all'}
    onSelect={(value: string) => console.log(`${value} 선택됨`)}
  />
 */
