import * as S from './style';
import LikedCount from './liked-count';
import { ArticleComment } from '@/pages/community/hooks/comment/useGetArticleComments';

export default function CommentCard({ comment }: CommentCardProps) {
  const authorName =
    comment.isAnonymous === 0
      ? comment.authorInfo.nickname
      : `익명${comment.isAnonymous}`;
  return (
    <S.MainContainer>
      <S.ProfileWrapper>
        <S.ProfileImage image="/image/peekle-profile.webp" />
      </S.ProfileWrapper>
      <S.Container>
        <S.TopTextContainer>
          <S.Nickname>{authorName}</S.Nickname>
          <S.Date>{comment.createdAt}</S.Date>
        </S.TopTextContainer>
        <S.Content>{comment.content}</S.Content>
        <S.BottomContainer>
          <S.ReplyButton>답글달기</S.ReplyButton>
          <S.ListButton />
        </S.BottomContainer>
      </S.Container>
      <S.LeftContainer>
        <LikedCount count={'0'} isLiked={false} />
      </S.LeftContainer>
    </S.MainContainer>
  );
}

interface CommentCardProps {
  comment: ArticleComment;
}
