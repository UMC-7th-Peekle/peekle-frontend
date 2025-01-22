import * as S from './style';
import { useState, useRef } from 'react';
import { DropdownProps, DropdownItem } from '@/types/common';
import { Portal } from '@/components';

export const Dropdown = ({ list, onClick, onSelect, width }: DropdownProps) => {
  const defaultLabel = list[0].label;
  const defaultValue = list[0].value;
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<DOMRect | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
    setIsOpen((prev) => !prev);

    // Dropdown의 위치 계산
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownRect(rect);
    }
  };

  const handleItemClick = (item: DropdownItem, e: React.MouseEvent) => {
    e.stopPropagation();

    const userLocationAgree = localStorage.getItem('curr-location-agree');
    if (item.value === 'shortest_distance' && !userLocationAgree) {
      // 위치 정보 확인 팝업 띄우기
    }

    setSelectedValue(item.value);
    onSelect?.(item.value);
    setIsOpen(false);
  };

  const selectedLabel =
    list.find((item) => item.value === selectedValue)?.label ?? defaultLabel;

  const hasChanged = selectedLabel !== defaultLabel;

  return (
    <S.Dropdown
      ref={dropdownRef}
      role="button"
      aria-label={`${defaultValue}-dropdown`}
      aria-expanded={isOpen}
      onClick={(e) => handleToggleDropdown(e)}
      $isActive={hasChanged}
      $width={width}
    >
      {selectedLabel}
      <S.ArrowDownIcon />
      {isOpen && (
        <Portal
          type="other-portal"
          isDropdown={true}
          onClose={() => setIsOpen(false)}
        >
          <S.List $dropdownRect={dropdownRect ?? undefined}>
            {list.map((item) => (
              <S.ListItem
                key={item.value}
                role="option"
                aria-selected={item.value === selectedValue}
                $isActive={item.value === selectedValue}
                onClick={(e) => handleItemClick(item, e)}
              >
                {item.label}
              </S.ListItem>
            ))}
          </S.List>
        </Portal>
      )}
    </S.Dropdown>
  );
};

export default Dropdown;

/** 사용 예시
 * const SORT_OPTIONS = [
    { label: '정렬 기준 선택', value: 'sort'}, // 기본값
    { label: '최신순', value: 'latest'},
    { label: '오래된순', value: 'oldest'},
  ];

 * <Dropdown
    list={SORT_OPTIONS} // 선택 가능한 리스트 (label, value)
    onClick={() => {}} // 드롭다운 클릭시 호출되는 함수 (optional)
    onSelect={(value) => {}} // 항목 선택 시 호출되는 함수 (optional)
    width={'100px'} // 드롭다운 너비 고정 필요시 (optional)
  />
 */
