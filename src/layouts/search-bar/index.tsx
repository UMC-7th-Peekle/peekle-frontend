import { useNavigate } from 'react-router-dom';
import * as S from './style';
import TextFields from '@/components/common/input/text-fields';

interface SearchBarProps {
  queryKey: string;
  placeholder?: string;
  onQuerySubmit?: (query: string) => void;
}

export const SearchBar = ({
  queryKey,
  placeholder = '관심 있는 활동 검색',
  onQuerySubmit = () => {},
}: SearchBarProps) => {
  const navigate = useNavigate();

  // 뒤로가기 버튼 따로 제작 필요
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMapClick = () => {
    navigate('/event/map');
  };

  const handleTextFieldsClick = () => {
    console.log('click');
    navigate('/event/search');
  };

  return (
    <S.SearchBarWrapper3>
      <S.BackIcon onClick={handleBackClick} />
      <TextFields
        queryKey={queryKey}
        placeholder={placeholder}
        onQuerySubmit={onQuerySubmit}
        onClick={handleTextFieldsClick}
      />
      <S.MapIcon onClick={handleMapClick} />
    </S.SearchBarWrapper3>
  );
};

// Map만 있는 버전
export const SearchBarMap = ({
  queryKey,
  placeholder = '관심 있는 활동 검색',
  onQuerySubmit = () => {},
}: SearchBarProps) => {
  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate('/event/map');
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
