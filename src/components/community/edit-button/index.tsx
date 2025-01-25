import * as S from './style';

export default function EditButton({ text }: EditButtonProps) {
  return (
    <S.RectTypeContainer>
      <S.PenIcon />
      <S.ButtonText>{text}</S.ButtonText>
    </S.RectTypeContainer>
  );
}

EditButton.RectType = function RectType({ text }: EditButtonProps) {
  return <EditButton text={text} />;
};

interface EditButtonProps {
  text: string;
}
