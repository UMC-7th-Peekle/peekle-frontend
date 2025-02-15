import * as S from './style';
import Heart from '@/assets/images/icons/heart-filled.svg?react';

// 커뮤니티 상세페이지에 쓰이는 LikeCard 컴포넌트입니다.
export default function LikeCard({
  count = 0,
  isLiked = false,
  onClick = () => {},
}: LikeCardProps) {
  return (
    <S.Container onClick={onClick} isLiked={isLiked}>
      <Heart />
      <S.Count>{count}</S.Count>
    </S.Container>
  );
}

interface LikeCardProps {
  count: number;
  isLiked?: boolean;
  onClick?: () => void;
}
