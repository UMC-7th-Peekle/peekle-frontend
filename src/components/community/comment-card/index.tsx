import { CommunityDetailComment } from '@/pages/community/hooks/article/useGetCommunityDetail';
import * as S from './style';
import LikedCount from './liked-count';

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <S.MainContainer>
      <S.ProfileWrapper>
        <S.ProfileImage image="/image/peekle-profile.webp" />
      </S.ProfileWrapper>
      <S.Container>
        <S.TopTextContainer>
          <S.Nickname>{'익명1'}</S.Nickname>
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
  comment: CommunityDetailComment;
}
