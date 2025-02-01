import * as S from './style.ts';
import { useTextFields } from './useTextFields.ts';

interface TextFieldsProps {
  queryKey: string;
  onQuerySubmit?: (query: string) => void;
  placeholder?: string;
  onClick?: () => void; // 클릭시 검색 페이지로 이동
  max_width?: number;
  min_width?: number;
  localKey: string;
  page?: 'eventMap' | ''; // 스타일 다르게 적용
}

export const TextFields = ({
  queryKey,
  placeholder = '관심 있는 활동 검색',
  onClick,
  max_width,
  min_width,
  localKey,
  page = '',
  onQuerySubmit = () => {},
}: TextFieldsProps) => {
  const { inputValue, handleChange, handleKeyDown, handleClear } =
    useTextFields({
      queryKey,
      localKey,
      onQuerySubmit,
    });

  return (
    <S.SearchWrapper max_width={max_width} min_width={min_width} $page={page}>
      <S.SearchIcon $page={page} />
      <S.SearchInput
        id="search-input"
        type="search"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e.key)}
        onClick={onClick}
        placeholder={placeholder}
        aria-label="검색어 입력"
        autoComplete="off"
        $page={page}
      />
      {inputValue && <S.DeleteIcon onClick={handleClear} />}
    </S.SearchWrapper>
  );
};

export default TextFields;
