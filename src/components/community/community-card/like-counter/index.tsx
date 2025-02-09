import * as S from './style';

export default function LikeCounter({
  count = 0,
  isLiked = false,
}: LikeCounterProps) {
  return (
    <S.Container isLiked={isLiked}>
      <S.Heart isLiked={isLiked} />
      <p>{count}</p>
    </S.Container>
  );
}

interface LikeCounterProps {
  count?: number;
  isLiked?: boolean;
}
