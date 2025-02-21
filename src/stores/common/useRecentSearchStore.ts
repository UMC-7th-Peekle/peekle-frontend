import { create } from 'zustand';

interface RecentSearchState {
  recentSearch: string[];
  setRecentSearch: (search: string) => void;
  removeRecentSearch: (search: string) => void;
  clearRecentSearch: () => void;
}

const useRecentSearchStore = create<RecentSearchState>((set) => ({
  recentSearch: [],
  setRecentSearch: (search: string) =>
    set((state) => {
      // 검색어가 이미 존재하는지 체크하여 중복 추가 방지
      const flattenedSearches = state.recentSearch.flat(Infinity);
      if (!flattenedSearches.includes(search)) {
        return { recentSearch: [...state.recentSearch, search] };
      }
      return state;
    }),
  removeRecentSearch: (search: string) =>
    set((state) => ({
      recentSearch: state.recentSearch.filter((item) => item !== search),
    })),
  clearRecentSearch: () => set({ recentSearch: [] }),
}));

export default useRecentSearchStore;
