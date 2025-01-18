import * as S from './Select.styles';
import { SelectProps } from '@/types/common';
import { useBottomSheetStore, useTabsStore } from '@/stores';
import { useQueryState } from 'nuqs';

// select가 이벤트 외에도 쓰인다면 리팩토링 필요
export const Select = ({ option, defaultValue, defaultLabel }: SelectProps) => {
  const [value] = useQueryState(option, {
    defaultValue: defaultValue ?? '',
  });

  const { setIsBottomSheetOpen } = useBottomSheetStore();
  const { setActiveTab } = useTabsStore();

  const handleSelectClick = () => {
    setActiveTab(option); // 클릭한 Select의 option을 activeTab으로 설정
    setIsBottomSheetOpen(true); //bottomSheet 열기
  };

  return (
    <S.Select key={option} onClick={handleSelectClick} $isActive={!!value}>
      {defaultLabel}
      <S.ArrowDownIcon />
    </S.Select>
  );
};

export default Select;
