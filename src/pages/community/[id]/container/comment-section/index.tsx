import { CommentCard } from '@/components';
import { CommunityDetailComments } from '@/pages/community/hooks/query/useGetCommunityDetail';

interface CommentSectionProps {
  comments: CommunityDetailComments;
}

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <>
      {comments.map((comment, index) => (
        <CommentCard key={`${index} + ${comment}`} comment={comment} />
      ))}
    </>
  );
}
