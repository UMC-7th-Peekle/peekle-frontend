import Heart from '@/assets/images/icons/heart.svg?react';
import * as S from './style';

export default function ToggleHeart({ onClick = () => {} }: Props) {
  return (
    <S.IconWrapper onClick={onClick}>
      <Heart />
    </S.IconWrapper>
  );
}

interface Props {
  onClick?: () => void;
}
