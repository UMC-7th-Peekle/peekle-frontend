import * as S from './style';

export default function LikedCount({ isLiked, count }: LikedCountProps) {
  return (
    <S.Column>
      <S.Heart isLiked={isLiked} />
      <S.Count>{count}</S.Count>
    </S.Column>
  );
}

interface LikedCountProps {
  isLiked: boolean;
  count: string;
}
