import { StyledCheckbox, StyledIcon } from './style';

interface Props {
  isChecked: boolean;
  toggleCheckbox: VoidFunction;
}

export default function Checkbox({ isChecked, toggleCheckbox }: Props) {
  return (
    <StyledCheckbox onClick={toggleCheckbox} $isChecked={isChecked}>
      <StyledIcon $isChecked={isChecked} />
    </StyledCheckbox>
  );
}
