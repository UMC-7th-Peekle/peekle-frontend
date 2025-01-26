import LikeCounter from '@/components/community/community-card/like-counter';
import * as S from './style';
import CommentCounter from '@/components/community/community-card/comment-counter';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// 커뮤니티 게시판에 사용되는 Card 컴포넌트입니다
export default function CommunityCard({
  articleId,
  title,
  content,
  date,
  imgUrl,
}: CommunityCardProps) {
  const defaultImageUrl =
    'https://dummyimage.com/80x80/bfbfbf/c9c9c9.png&text=임시+이미지';

  const id: string = articleId;
  return (
    <S.Container to={`/community/${id}`}>
      <S.LeftContainer>
        <S.Title>{title}</S.Title>
        <S.Content>{content}</S.Content>
        <S.Date>{date}</S.Date>
      </S.LeftContainer>
      <S.RightContainer>
        <S.Thumbnail imageUrl={imgUrl || defaultImageUrl} />
        <S.CounterContainer>
          <LikeCounter />
          <CommentCounter />
        </S.CounterContainer>
      </S.RightContainer>
    </S.Container>
  );
}

interface CommunityCardProps {
  articleId: string;
  title: string;
  content: string;
  date: string;
  imgUrl?: string;
}

// CommunityCard.Skeleton 컴포넌트
export const CommunityCardSkeleton = () => {
  return (
    <S.Container to="#">
      <S.LeftContainer>
        <Skeleton width="60%" height="20px" style={{ marginBottom: '8px' }} />{' '}
        <Skeleton count={2} height="15px" style={{ marginBottom: '12px' }} />{' '}
        <Skeleton width="40%" height="14px" />
      </S.LeftContainer>
      <S.RightContainer>
        <Skeleton width="80px" height="80px" style={{ borderRadius: '8px' }} />{' '}
        <S.CounterContainer>
          <Skeleton circle width="20px" height="20px" />
          <Skeleton circle width="20px" height="20px" />
        </S.CounterContainer>
      </S.RightContainer>
    </S.Container>
  );
};
