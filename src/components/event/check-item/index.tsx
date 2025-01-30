import * as S from './style';
import { CheckItemProps } from '@/types/event';

export const CheckItem = ({ text, onClick, isActive }: CheckItemProps) => {
  return (
    <S.CheckItem onClick={onClick}>
      <S.Text $isActive={isActive}>{text}</S.Text>
      {isActive && <S.CheckIcon />}
    </S.CheckItem>
  );
};

export default CheckItem;
