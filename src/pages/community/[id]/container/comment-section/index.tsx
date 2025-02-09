import { CommentCard } from '@/components';
import { CommunityDetailComments } from '@/pages/community/hooks/query/useGetCommunityDetail';
import * as S from './style';

interface CommentSectionProps {
  comments: CommunityDetailComments;
}

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <>
      {comments.map((comment, index) => (
        <CommentCard key={`${index} + ${comment}`} comment={comment} />
      ))}
      {comments.length === 0 && (
        <S.NoCommentContainer>
          <S.CommentIcon />
          <S.NoCommentText>첫 댓글을 남겨주세요!</S.NoCommentText>
        </S.NoCommentContainer>
      )}
    </>
  );
}
