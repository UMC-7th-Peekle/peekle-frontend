import { StyledCheckbox, StyledIcon } from './style';

export default function Checkbox({ isChecked, toggleCheckbox }: props) {
  return (
    <StyledCheckbox onClick={toggleCheckbox} isChecked={isChecked}>
      <StyledIcon isChecked={isChecked} />
    </StyledCheckbox>
  );
}

interface props {
  isChecked: boolean;
  toggleCheckbox: VoidFunction;
}
