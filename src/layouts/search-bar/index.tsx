import { useNavigate } from 'react-router-dom';
import * as S from './style';
import TextFields from '@/components/common/input/text-fields';
import Backward from '@/components/common/backward';

interface SearchBarProps {
  page: 'event' | 'community';
  queryKey: string;
  placeholder?: string;
  onQuerySubmit?: (query: string) => void;
  localKey: string;
}

export const SearchBar = ({
  page,
  queryKey,
  localKey,
  placeholder = '관심 있는 활동 검색',
}: SearchBarProps) => {
  const navigate = useNavigate();

  const handleTextFieldsClick = () => {
    if (page === 'event') navigate('/event/search');
    else navigate('/community/search');
  };

  return (
    <S.SearchBarWrapper3>
      <Backward />
      <TextFields
        queryKey={queryKey}
        placeholder={placeholder}
        onClick={handleTextFieldsClick}
        localKey={localKey}
      />
    </S.SearchBarWrapper3>
  );
};
