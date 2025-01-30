import * as S from './style';
import { ChipProps } from '@/types/common';

const Chip = ({ label, value, isActive, onSelect }: ChipProps) => {
  return (
    <S.Chip
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
 * <Chip
    key={value}
    label={label}
    value={value}
    isActive={selectedValue === value}
    onSelect={() => handleChipSelect(value)}
  />
 */
