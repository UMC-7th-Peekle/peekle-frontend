import { useRef } from 'react';
import * as S from './style';
import AnonymousCheck from '../anonymous-check';
import Pen from '@/assets/images/community/pen.svg?react';
import { useCommentReply } from '@/stores/community/useCommentReply';

interface CommentInputProps {
  isAnonymous: boolean;
  onToggleAnonymous: () => void;
  comment: string;
  setComment: (value: string) => void;
  onSubmit: () => void;
}

export default function CommentInput({
  isAnonymous,
  onToggleAnonymous,
  comment,
  setComment,
  onSubmit,
}: CommentInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { replyingTo } = useCommentReply();

  // ✅ textarea 높이 자동 조정
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <S.Container>
      <S.InputWrapper $hasText={comment.length > 0}>
        <S.AnonymousCheckWrapper>
          <AnonymousCheck
            isChecked={isAnonymous}
            onToggle={onToggleAnonymous}
          />
        </S.AnonymousCheckWrapper>

        <S.StyledTextarea
          ref={textareaRef}
          placeholder={
            replyingTo
              ? `${replyingTo.authorName}님에게 답글 남기기...`
              : '따뜻한 댓글을 입력해주세요 :)'
          }
          value={comment}
          onChange={handleInput}
          rows={1}
        />
      </S.InputWrapper>

      {comment.length > 0 && (
        <S.SendButton onClick={onSubmit}>
          <Pen />
        </S.SendButton>
      )}
    </S.Container>
  );
}
