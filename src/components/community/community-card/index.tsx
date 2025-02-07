import LikeCounter from '@/components/community/community-card/like-counter';
import * as S from './style';
import CommentCounter from '@/components/community/community-card/comment-counter';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ forwardRef를 사용하여 `ref`를 받을 수 있도록 변경
const CommunityCard = forwardRef<HTMLDivElement, CommunityCardProps>(
  (
    {
      communityId,
      articleId,
      title,
      content,
      date,
      articleComments,
      articleLikes,
      thumbnail,
      isLiked,
    },
    ref,
  ) => {
    const navigate = useNavigate();
    return (
      <S.Container
        onClick={() => navigate(`/community/${communityId}/${articleId}`)}
        ref={ref}
      >
        <S.LeftContainer>
          <S.Title>{title}</S.Title>
          <S.Content>{content}</S.Content>
          <S.Date>{date}</S.Date>
        </S.LeftContainer>
        <S.RightContainer>
          {thumbnail ? <S.Thumbnail image={thumbnail} /> : <S.SizedBox />}
          <S.CounterContainer>
            <LikeCounter count={articleLikes} isLiked={isLiked || false} />
            <CommentCounter count={articleComments} />
          </S.CounterContainer>
        </S.RightContainer>
      </S.Container>
    );
  },
);

// forwardRef 사용 시 displayName 추가 (디버깅 편의를 위해)
CommunityCard.displayName = 'CommunityCard';

export default CommunityCard;

interface CommunityCardProps {
  communityId: number;
  articleId: number;
  title: string;
  content: string;
  date: string;
  articleComments: number;
  articleLikes: number;
  thumbnail?: string | null;
  isLiked?: boolean;
}

// CommunityCard.Skeleton 컴포넌트
export const CommunityCardSkeleton = () => {
  return (
    <S.Container>
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
