import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { TextFields, Backward } from '@/components';
import { ROUTES } from '@/constants/routes';

interface SearchBarProps {
  page: 'event' | 'community';
  queryKey: string;
  localKey: string;
  placeholder?: string;
  onQuerySubmit?: (query: string) => void;
}

export const SearchBar = ({
  page,
  queryKey,
  localKey,
  placeholder = '관심 있는 활동 검색',
  onQuerySubmit,
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
        onQuerySubmit={onQuerySubmit}
      />
    </S.SearchBarWrapper>
  );
};
