import * as S from './style';

export default function EditButton({
  text = '글 쓰기',
  onClick = () => {},
}: EditButtonProps) {
  return (
    <S.DefaultTypeContainer onClick={onClick}>
      <S.PenIcon />
      <S.ButtonText>{text}</S.ButtonText>
    </S.DefaultTypeContainer>
  );
}

EditButton.RectType = function RectType({
  text = '글 쓰러 가기',
  onClick = () => {},
}: EditButtonProps) {
  return (
    <S.RectTypeContainer onClick={onClick}>
      <S.PenIconRect />
      <S.ButtonText>{text}</S.ButtonText>
    </S.RectTypeContainer>
  );
};

interface EditButtonProps {
  text?: string;
  onClick?: () => void;
}
