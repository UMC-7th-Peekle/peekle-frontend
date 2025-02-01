import * as S from './style';
import { TextFields, CategoryChips } from '@/components';
import { useBottomSheetStore } from '@/stores';
import { BOTTOM_SHEET_ID_EVENT_FILTER } from '@/constants/event';

const MapHeader = () => {
  const { setActiveBottomSheet } = useBottomSheetStore();
  return (
    <S.HeaderContainer>
      <S.SearchBarWrapper>
        <TextFields
          queryKey={'event-search'}
          placeholder={'관심 있는 활동 검색'}
          localKey={'recent-event-search'}
          page={'eventMap'}
        />
        <S.FilterButton
          role="button"
          aria-label="이벤트 필터 열기 버튼"
          onClick={() => setActiveBottomSheet(BOTTOM_SHEET_ID_EVENT_FILTER)}
        />
      </S.SearchBarWrapper>
      <CategoryChips />
    </S.HeaderContainer>
  );
};

export default MapHeader;
