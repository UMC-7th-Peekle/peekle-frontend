import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { TextFields, Backward } from '@/components';
import { ROUTES } from '@/constants/routes';

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
    if (page === 'event') navigate(ROUTES.EVENT_SEARCH);
    else navigate(ROUTES.COMMUNITY_SEARCH);
  };

  return (
    <S.SearchBarWrapper>
      <Backward />
      <TextFields
        queryKey={queryKey}
        placeholder={placeholder}
        onClick={handleTextFieldsClick}
        localKey={localKey}
      />
    </S.SearchBarWrapper>
  );
};
