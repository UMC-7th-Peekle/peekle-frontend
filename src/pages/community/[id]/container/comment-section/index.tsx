import { CommentCard } from '@/components';
import { CommunityDetailComments } from '@/pages/community/hooks/query/useGetCommunityDetail';

interface CommentSectionProps {
  comments: CommunityDetailComments;
}

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard key={`${comment}`} comment={comment} />
      ))}
    </>
  );
}
