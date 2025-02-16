import * as S from './style';
import { SearchBar } from '@/layouts/search-bar';

const SearchHeader = () => {
  return (
    <S.HeaderContainer>
      <SearchBar
        page="event"
        queryKey="event-search"
        localKey="recent-event-search"
        placeholder="관심있는 활동 검색"
      />
    </S.HeaderContainer>
  );
};

export default SearchHeader;
