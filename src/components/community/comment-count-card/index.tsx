import * as S from './style';
import Chat from '@/assets/images/icons/chat-solid.svg?react';

// 커뮤니티 상세페이지에 쓰이는 LikeCard 컴포넌트입니다.
export default function CommentCountCard({ count = 0 }: CommentCountCardProps) {
  return (
    <S.Container>
      <Chat />
      <S.Count>{count}</S.Count>
    </S.Container>
  );
}

interface CommentCountCardProps {
  count: number;
}
