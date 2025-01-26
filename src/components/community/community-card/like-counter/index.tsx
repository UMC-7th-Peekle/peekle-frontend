import * as S from './style';
import Heart from '@/assets/images/icons/heart-filled.svg?react';

export default function LikeCounter({ count = 0 }: LikeCounterProps) {
  return (
    <S.Container>
      <Heart />
      <p>{count}</p>
    </S.Container>
  );
}

interface LikeCounterProps {
  count?: number;
}
