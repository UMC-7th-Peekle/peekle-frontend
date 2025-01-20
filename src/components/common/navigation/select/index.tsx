import * as S from './style';
import {
  SORT_OPTIONS,
  CATEGORY_OPTIONS,
  PRICE_OPTIONS,
  LOCATION_OPTIONS,
} from '@/constants/event';
import { SelectProps } from '@/types/common';
import { useBottomSheetStore, useTabsStore } from '@/stores';
import { useEventFilter } from '@/hooks';
import { BOTTOM_SHEET_ID_EVENT_FILTER } from '@/constants/event';
/**
 * select가 이벤트 외에도 쓰인다면 리팩토링 필요
 */

const getLabel = (option: string, value: string, defaultLabel: string) => {
  const optionsMap = {
    sort: SORT_OPTIONS,
    category: CATEGORY_OPTIONS,
    price: PRICE_OPTIONS,
    location: LOCATION_OPTIONS,
  } as const;

  if (option === 'duration') {
    return value === 'all' ? '기간' : value.split(',').join('~');
  }

  if (option === 'sort' || option === 'price') {
    return (
      optionsMap[option as keyof typeof optionsMap].find(
        ([, v]) => v === value,
      )?.[0] ?? defaultLabel
    );
  }

  // 중복가능 값이면 (카테고리, 지역) 라벨을 찾아서 join
  const labels = value
    .split(',')
    .map(
      (val) =>
        optionsMap[option as keyof typeof optionsMap].find(
          ([, v]) => v === val,
        )?.[0],
    )
    .filter(Boolean);

  return labels.length ? labels.join(', ') : defaultLabel;
};

export const Select = ({ option, defaultValue, defaultLabel }: SelectProps) => {
  const { storedValue } = useEventFilter({
    key: option,
    type:
      option === 'category' || option === 'location' ? 'multiple' : 'single',
  });
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { setActiveTab } = useTabsStore();

  const handleSelectClick = () => {
    setActiveTab(option); // 클릭한 Select의 option을 activeTab으로 설정
    setActiveBottomSheet(BOTTOM_SHEET_ID_EVENT_FILTER); //bottomSheet 열기
  };

  const currentValue = storedValue ?? defaultValue;
  const label = getLabel(option, currentValue, defaultLabel);

  const hasChanged = currentValue !== defaultValue;

  return (
    <S.Select onClick={handleSelectClick} $isActive={hasChanged}>
      {hasChanged ? label : defaultLabel}
      <S.ArrowDownIcon />
    </S.Select>
  );
};

export default Select;

/** 사용 예시
 * <Select
    key={'sort'}
    option={'sort'} // select 이름, 쿼리 파람에 들어감
    defaultValue={'latest'} // 기본값
    defaultLabel={'가까운 날짜순'} // 기본적으로 UI에 표시될 값
  />
 */
