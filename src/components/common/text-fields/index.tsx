import * as S from './style.ts';
import { useTextFields } from './useTextFields.ts';

interface SearchProps {
  queryKey: string;
  placeholder?: string;
  onQuerySubmit?: (query: string) => void;
}

export const TextFields = ({
  queryKey,
  placeholder = '관심 있는 활동 검색',
  onQuerySubmit = () => {},
}: SearchProps) => {
  const { inputValue, handleChange, handleKeyDown, handleClear } =
    useTextFields({
      queryKey,
      onQuerySubmit,
    });

  return (
    <S.SearchWrapper>
      <S.SearchIcon />
      <S.SearchInput
        id="search-input"
        type="search"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e.key)}
        placeholder={placeholder}
        aria-label="검색어 입력"
        autoComplete="off"
      />
      {inputValue && <S.DeleteIcon onClick={handleClear} />}
    </S.SearchWrapper>
  );
};

export default TextFields;
