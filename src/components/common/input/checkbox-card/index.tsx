import { StyledCheckboxCard, CardText, CheckIcon } from './style';
interface CheckboxCardProps {
  text: string;
  isChecked: boolean;
  isLastCard?: boolean;
  onClick: () => void;
}

export default function CheckboxCard({
  text = '',
  isChecked,
  isLastCard = false,
  onClick,
}: CheckboxCardProps) {
  return (
    <StyledCheckboxCard
      onClick={onClick}
      $isChecked={isChecked}
      $isLastCard={isLastCard}
    >
      <CardText $isChecked={isChecked}>{text}</CardText>
      {isChecked && <CheckIcon />}
    </StyledCheckboxCard>
  );
}
