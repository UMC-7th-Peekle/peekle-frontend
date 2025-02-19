import { usePostComment } from '@/pages/community/hooks/comment/usePostComment';
import { usePostCommentReply } from '@/pages/community/hooks/comment/usePostCommentReply';
import { useCommentReply } from '@/stores/community/useCommentReply';
import { useState } from 'react';

export default function useComment({
  communityId,
  articleId,
}: {
  communityId: number;
  articleId: number;
}) {
  const postCommentMutation = usePostComment({ communityId, articleId });
  const postCommentReplyMutation = usePostCommentReply({
    communityId,
    articleId,
  });

  const { replyingTo, reReplyingTo, clearReply } = useCommentReply();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [comment, setComment] = useState('');

  const onToggleAnonymous = () => {
    setIsAnonymous((prev) => !prev);
  };

  const onSubmit = () => {
    if (!comment.trim()) return; // ✅ 빈 댓글 방지

    if (reReplyingTo) {
      // ✅ 답글 요청
      postCommentReplyMutation.mutate({
        communityId,
        articleId,
        content: comment,
        isAnonymous,
        commentId: reReplyingTo.parentCommentId,
      });
      clearReply();
    } else if (replyingTo) {
      postCommentReplyMutation.mutate({
        communityId,
        articleId,
        content: comment,
        isAnonymous,
        commentId: replyingTo.commentId,
      });
      clearReply();
    } else {
      postCommentMutation.mutate({
        communityId,
        articleId,
        content: comment,
        isAnonymous,
      });
    }
    setComment('');
  };

  return { isAnonymous, comment, setComment, onToggleAnonymous, onSubmit };
}
