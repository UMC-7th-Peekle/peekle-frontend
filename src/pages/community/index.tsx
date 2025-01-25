import ToggleSearch from '@/components/community/toggle-search';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import BodySection from '@/pages/community/container/body-section';
import ToggleHeart from '@/components/common/toggle-heart';

export default function CommunityPage() {
  const navigate = useNavigate();

  return (
    <S.MainContainer>
      <S.Appbar>
        <S.Title>게시판</S.Title>
        <S.AppbarIcon>
          <ToggleHeart onClick={() => navigate(ROUTES.COMMUNITY_LIKE)} />
          <ToggleSearch onClick={() => navigate(ROUTES.COMMUNITY_SEARCH)} />
        </S.AppbarIcon>
      </S.Appbar>
      <BodySection.None />
    </S.MainContainer>
  );
}
