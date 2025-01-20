import { StyledCheckboxCard, CardText } from './style';
import Checkbox from '@/components/common/input/checkbox';
interface CheckboxCardProps {
  text?: string;
  isChecked: boolean;
  toggleCheckbox: () => void;
}

export default function CheckboxCard({
  text = '',
  isChecked,
  toggleCheckbox,
}: CheckboxCardProps) {
  return (
    <StyledCheckboxCard $isChecked={isChecked}>
      <Checkbox isChecked={isChecked} toggleCheckbox={toggleCheckbox} />
      <CardText $isChecked={isChecked}>{text}</CardText>
    </StyledCheckboxCard>
  );
}
