import * as S from './style';
import useBottomSheetStore from '@/stores/common/useBottomSheetStore';
import useEventFilter from '@/hooks/event/useEventFilter';
import CheckItem from '@/components/event/check-item';
import { SORT_OPTIONS } from '@/constants/event';

export const BottomSheetSort = () => {
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { handleSelect, isSelected } = useEventFilter({
    key: '정렬',
    type: 'single',
  });
  // console.log(filteredEvent);
  return (
    <S.Container>
      <S.Header>
        <S.Title>필터</S.Title>
      </S.Header>
      {SORT_OPTIONS.map((value) => (
        <CheckItem
          key={value}
          text={value}
          onClick={() => handleSelect(value)}
          isActive={isSelected(value)}
        />
      ))}
      <S.CloseButton
        onClick={() => {
          setActiveBottomSheet(null);
        }}
      >
        닫기
      </S.CloseButton>
    </S.Container>
  );
};

export default BottomSheetSort;
