import ToggleSearch from '@/components/community/toggle-search';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import ToggleHeart from '@/components/common/toggle-heart';
import { useGetCommunity } from './hooks/query/useGetCommunity';
import BodySection from '@/pages/community/container/body-section';
import CommunityCard from '@/components/community/community-card';
import { EditButton, ErrorFallback } from '@/components';

export default function CommunityPage() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetCommunity({
    limit: 5,
  });

  // 로딩 상태 처리
  if (isLoading)
    return (
      <>
        <S.MainContainer>
          <S.Appbar>
            <S.LogoContainer>
              <S.PeekleLogo />
              <S.Title>게시판</S.Title>
            </S.LogoContainer>
            <S.AppbarIcon>
              <ToggleHeart />
              <ToggleSearch />
            </S.AppbarIcon>
          </S.Appbar>
          <BodySection.Skeleton />
        </S.MainContainer>
      </>
    );
  // 에러 상태 처리
  if (error) return <ErrorFallback />;
  return (
    <>
      <S.MainContainer>
        <S.Appbar>
          <S.LogoContainer>
            <S.PeekleLogo />
            <S.Title>게시판</S.Title>
          </S.LogoContainer>
          <S.AppbarIcon>
            <ToggleHeart onClick={() => navigate(ROUTES.COMMUNITY_LIKE)} />
            <ToggleSearch onClick={() => navigate(ROUTES.COMMUNITY_SEARCH)} />
          </S.AppbarIcon>
        </S.Appbar>
        {data?.success?.articles.length ? (
          // 게시글이 하나 이상일 때
          <>
            <BodySection>
              {data.success.articles.map((article) => (
                <CommunityCard
                  key={`${article.communityId} + ${article.articleId}`}
                  communityId={article.communityId}
                  articleId={article.articleId}
                  title={article.title}
                  content={article.content}
                  date={article.createdAt}
                  articleComments={article.articleComments}
                  articleLikes={article.articleLikes}
                  thumbnail={article.thumbnail}
                />
              ))}
            </BodySection>
          </>
        ) : (
          // 아무 게시글도 없을 때
          <BodySection.None subTitle={'첫 번째 게시글을\n작성해보세요!'} />
        )}
      </S.MainContainer>
      {data?.success?.articles.length && (
        <S.EditButtonWrapper>
          <EditButton onClick={() => navigate('/community/edit')} />
        </S.EditButtonWrapper>
      )}
    </>
  );
}
