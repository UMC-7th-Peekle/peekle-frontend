import { useNavigate } from 'react-router-dom';
import * as S from './style';
import TextFields from '@/components/common/input/text-fields';
import Backward from '@/components/common/backward';

interface SearchBarProps {
  queryKey: string;
  placeholder?: string;
  onQuerySubmit?: (query: string) => void;
  localKey: string;
}

export const SearchBar = ({
  queryKey,
  localKey,
  placeholder = '관심 있는 활동 검색',
  onQuerySubmit = () => {},
}: SearchBarProps) => {
  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate('/event/map');
  };

  const handleTextFieldsClick = () => {
    console.log('click');
    navigate('/event/search');
  };

  return (
    <S.SearchBarWrapper3>
      <Backward />
      <TextFields
        queryKey={queryKey}
        placeholder={placeholder}
        onQuerySubmit={onQuerySubmit}
        onClick={handleTextFieldsClick}
        localKey={localKey}
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
  localKey,
}: SearchBarProps) => {
  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate('/event/map');
  };

  return (
    <S.SearchBarWrapper2>
      <TextFields
        queryKey={queryKey}
        localKey={localKey}
        placeholder={placeholder}
        onQuerySubmit={onQuerySubmit}
      />
      <S.MapIcon onClick={handleMapClick} />
    </S.SearchBarWrapper2>
  );
};
