import * as S from './Select.styles';
import { useEffect } from 'react';
import { SelectProps } from '@/types/common';
import { useBottomSheetStore, useTabsStore } from '@/stores';
import { useQueryState } from 'nuqs';

// select가 이벤트 외에도 쓰인다면 리팩토링 필요
export const Select = ({ option, defaultValue, defaultLabel }: SelectProps) => {
  const [value, setValue] = useQueryState(option);
  const { setIsBottomSheetOpen } = useBottomSheetStore();
  const { setActiveTab } = useTabsStore();

  // 초기화 및 세션스토리지 동기화
  useEffect(() => {
    const storedValue = sessionStorage.getItem(option);
    if (storedValue) {
      setValue(storedValue);
    } else {
      setValue(defaultValue);
      sessionStorage.setItem(option, defaultValue);
    }
  }, [setValue, defaultValue, option]);

  // value가 변경될 때마다 세션스토리지 업데이트
  useEffect(() => {
    if (value) {
      sessionStorage.setItem(option, value);
    }
  }, [value, option]);

  const handleSelectClick = () => {
    setActiveTab(option); // 클릭한 Select의 option을 activeTab으로 설정
    setIsBottomSheetOpen(true); //bottomSheet 열기
  };

  return (
    <S.Select
      key={option}
      onClick={handleSelectClick}
      $isActive={value !== defaultValue}
    >
      {defaultLabel}
      <S.ArrowDownIcon />
    </S.Select>
  );
};

export default Select;

/** 사용 예시
 * <Select
    option={'sort'} // select 이름, 쿼리 파람에 들어감
    defaultValue={'latest'} // 기본값
    defaultLabel={'가까운 날짜순'} // 기본적으로 UI에 표시될 값
  />
 */
