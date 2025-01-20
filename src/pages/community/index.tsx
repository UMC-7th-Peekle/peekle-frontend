import ToggleSearch from '@/components/community/toggle-search';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import BodySection from '@/pages/community/container/body-section';

export default function CommunityPage() {
  const navigate = useNavigate();

  return (
    <S.MainContainer>
      <S.Appbar>
        <S.Title>게시판</S.Title>
        <ToggleSearch onClick={() => navigate(ROUTES.COMMUNITY_SEARCH)} />
      </S.Appbar>
      <BodySection.None />
    </S.MainContainer>
  );
}
