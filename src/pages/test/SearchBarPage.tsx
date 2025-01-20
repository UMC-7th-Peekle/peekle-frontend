import { SearchBar, SearchBarMap } from '@/layouts/search-bar';

export const SearchBarPage = () => {
  const handleSearchSubmit = (query: string) => {
    console.log('검색어:', query);
  };

  return (
    <div>
      <SearchBar
        queryKey="search"
        placeholder="검색어를 입력하세요"
        mapPagePath="/map"
        onQuerySubmit={handleSearchSubmit}
      />
      <SearchBarMap
        queryKey="search"
        placeholder="검색어를 입력하세요"
        mapPagePath="/map"
        onQuerySubmit={handleSearchSubmit}
      />
    </div>
  );
};
