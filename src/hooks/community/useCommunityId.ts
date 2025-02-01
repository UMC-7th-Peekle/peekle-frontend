import { useParams } from 'react-router-dom';

// /community/:communityId/:articleId 에서 두 id 값을 빼오는 훅입니다.
export default function useCommunityId() {
  const { communityId, articleId } = useParams<{
    communityId: string;
    articleId: string;
  }>();

  return { communityId, articleId };
}
