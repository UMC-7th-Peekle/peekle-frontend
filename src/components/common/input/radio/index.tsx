import { ReactNode } from 'react';
import { RadioIcon, RadioInput, RadioWrapper } from './style';

const Radio = ({
  name = '',
  value = '',
  checked = false,
  onChange,
  children,
}: Props) => {
  return (
    <RadioWrapper checked={checked}>
      <RadioInput
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <RadioIcon checked={checked} />
      {children}
    </RadioWrapper>
  );
};

interface Props {
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}

export default Radio;
