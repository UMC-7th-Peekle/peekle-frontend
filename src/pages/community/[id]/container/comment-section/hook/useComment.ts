import { usePostComment } from '@/pages/community/hooks/comment/usePostComment';
import { useState } from 'react';

export default function useComment({
  communityId,
  articleId,
}: {
  communityId: number;
  articleId: number;
}) {
  const postCommentMutation = usePostComment();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [comment, setComment] = useState('');

  const onToggleAnonymous = () => {
    setIsAnonymous((prev) => !prev);
  };

  const onSubmit = () => {
    postCommentMutation.mutate({
      communityId,
      articleId,
      content: comment,
      isAnonymous,
    });
    setComment('');
  };

  return { isAnonymous, comment, setComment, onToggleAnonymous, onSubmit };
}
