import * as S from './style';
import Chat from '@/assets/images/icons/chat-solid.svg?react';

export default function CommentCounter({ count = 0 }: CommentCounterProps) {
  return (
    <S.Container>
      <Chat />
      <p>{count}</p>
    </S.Container>
  );
}

interface CommentCounterProps {
  count?: number;
}
