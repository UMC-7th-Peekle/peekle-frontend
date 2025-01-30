import LikeCounter from '@/components/community/community-card/like-counter';
import * as S from './style';
import CommentCounter from '@/components/community/community-card/comment-counter';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// 커뮤니티 게시판에 사용되는 Card 컴포넌트입니다
export default function CommunityCard({
  communityId,
  articleId,
  title,
  content,
  date,
  articleComments,
  articleLikes,
  thumbnail,
}: CommunityCardProps) {
  return (
    <S.Container to={`/community/${communityId}/${articleId}`}>
      <S.LeftContainer>
        <S.Title>{title}</S.Title>
        <S.Content>{content}</S.Content>
        <S.Date>{date}</S.Date>
      </S.LeftContainer>
      <S.RightContainer>
        {thumbnail ? <S.Thumbnail image={thumbnail} /> : <S.SizedBox />}
        <S.CounterContainer>
          <LikeCounter count={articleLikes} />
          <CommentCounter count={articleComments} />
        </S.CounterContainer>
      </S.RightContainer>
    </S.Container>
  );
}

interface CommunityCardProps {
  communityId: number;
  articleId: number;
  title: string;
  content: string;
  date: string;
  articleComments: number;
  articleLikes: number;
  thumbnail?: string | null;
}

// CommunityCard.Skeleton 컴포넌트
export const CommunityCardSkeleton = () => {
  return (
    <S.Container to="#">
      <S.LeftContainer>
        <Skeleton width="180px" height="20px" style={{ marginBottom: '8px' }} />
        <Skeleton width="200px" height="40px" style={{ marginBottom: '8px' }} />
        <Skeleton width="40px" height="20px" />
      </S.LeftContainer>
      <S.RightContainer>
        <Skeleton width="80px" height="80px" style={{ borderRadius: '8px' }} />
        <S.CounterContainer>
          <Skeleton circle width="20px" height="20px" />
          <Skeleton circle width="20px" height="20px" />
        </S.CounterContainer>
      </S.RightContainer>
    </S.Container>
  );
};
