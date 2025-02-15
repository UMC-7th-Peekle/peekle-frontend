import * as S from './style';

export default function LikedCount({
  isLiked,
  count,
  onClick = () => {},
}: LikedCountProps) {
  return (
    <S.Column onClick={onClick}>
      <S.Heart isLiked={isLiked} />
      <S.Count $isLiked={isLiked}>{count}</S.Count>
    </S.Column>
  );
}

interface LikedCountProps {
  isLiked: boolean;
  count: number;
  onClick?: () => void;
}
