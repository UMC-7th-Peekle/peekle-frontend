import ToggleSearch from '@/components/community/toggle-search';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import BodySection from '@/pages/community/container/body-section';
import ToggleHeart from '@/components/common/toggle-heart';
import { z } from 'zod';
import { useGetCommunityId } from './hooks/query/useGetCommunityId';

// 게시글 데이터 스키마 정의
const articleSchema = z.object({
  articleId: z.number(),
  title: z.string(),
  content: z.string(),
  authorId: z.number(),
  isAnonymous: z.boolean(),
  communityId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export default function CommunityPage() {
  const navigate = useNavigate();

  // useFetchCommunityPosts 훅 호출
  const { data, isLoading, error } = useGetCommunityId({
    communityId: '1', // 예시로 communityId를 '1'로 지정
    cursor: 129, // 첫 페이지에서 시작
    take: 10, // 한 페이지에 가져올 게시글 수
    zodSchema: articleSchema,
  });

  // 로딩 상태 처리
  if (isLoading) return <p>Loading...</p>;

  // 에러 상태 처리
  if (error) return <p>Error: {error.message}</p>;

  // 데이터가 없을 때 처리
  if (!data?.success?.articles.length) return <p>게시글이 없습니다.</p>;

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
