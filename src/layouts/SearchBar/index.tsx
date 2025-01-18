import { useNavigate } from 'react-router-dom';
import * as S from './style';
import TextFields from '@/components/input/TextFields';

interface SearchBarProps {
  queryKey: string;
  placeholder?: string;
  mapPagePath: string; // Map 아이콘 클릭 시 이동할 경로
  onQuerySubmit?: (query: string) => void;
}

export const SearchBar = ({
  queryKey,
  placeholder = '관심 있는 활동 검색',
  mapPagePath,
  onQuerySubmit = () => {},
}: SearchBarProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMapClick = () => {
    navigate(mapPagePath);
  };

  return (
    <S.SearchBarWrapper3>
      <S.BackIcon onClick={handleBackClick} />
      <TextFields
        queryKey={queryKey}
        placeholder={placeholder}
        onQuerySubmit={onQuerySubmit}
      />
      <S.MapIcon onClick={handleMapClick} />
    </S.SearchBarWrapper3>
  );
};

// Map만 있는 버전
export const SearchBarMap = ({
  queryKey,
  placeholder = '관심 있는 활동 검색',
  mapPagePath,
  onQuerySubmit = () => {},
}: SearchBarProps) => {
  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate(mapPagePath);
  };

  return (
    <S.SearchBarWrapper2>
      <TextFields
        queryKey={queryKey}
        placeholder={placeholder}
        onQuerySubmit={onQuerySubmit}
      />
      <S.MapIcon onClick={handleMapClick} />
    </S.SearchBarWrapper2>
  );
};
