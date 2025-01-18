import { useState } from 'react';
import { StyledCheckboxCard, CardText } from './style';
import Checkbox from '@/components/input/Checkbox';

interface CheckboxCardProps {
  text?: string;
}

export default function CheckboxCard({ text = '' }: CheckboxCardProps) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <StyledCheckboxCard isChecked={isChecked}>
      <Checkbox isChecked={isChecked} toggleCheckbox={toggleCheckbox} />
      <CardText isChecked={isChecked}>{text}</CardText>
    </StyledCheckboxCard>
  );
}
