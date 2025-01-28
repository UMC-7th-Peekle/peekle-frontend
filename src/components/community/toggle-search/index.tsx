import Search from '@/assets/images/icons/search.svg?react';
import * as S from './style';

export default function ToggleSearch({ onClick = () => {} }: Props) {
  return (
    <S.IconWrapper onClick={onClick}>
      <Search />
    </S.IconWrapper>
  );
}

interface Props {
  onClick?: () => void;
}
