import * as S from './style';
import { SearchBar } from '@/layouts/search-bar';
import { useSearchBottomSheetStore } from '@/stores';

const SearchHeader = () => {
  const { setIsSearchBSOpen } = useSearchBottomSheetStore();
  const handleQuerySubmit = () => {
    console.log('query submit');
    setIsSearchBSOpen(true);
  };
  return (
    <S.HeaderContainer>
      <SearchBar
        page="event"
        queryKey="event-search"
        localKey="recent-event-search"
        placeholder="관심있는 활동 검색"
        onQuerySubmit={handleQuerySubmit}
      />
    </S.HeaderContainer>
  );
};

export default SearchHeader;
