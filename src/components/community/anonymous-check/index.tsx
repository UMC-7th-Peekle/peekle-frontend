import * as S from './style';

interface AnonymousCheckProps {
  isChecked: boolean;
  onToggle: () => void;
}

export default function AnonymousCheck({
  isChecked,
  onToggle,
}: AnonymousCheckProps) {
  return (
    <S.Container onClick={onToggle}>
      <S.CheckContainer isChecked={isChecked}>
        <S.Check isChecked={isChecked} />
      </S.CheckContainer>
      <S.Text isChecked={isChecked}>익명</S.Text>
    </S.Container>
  );
}
