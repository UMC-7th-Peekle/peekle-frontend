import styled from 'styled-components';

interface RadioWrapperProps {
  checked: boolean;
}

export const RadioWrapper = styled.label<RadioWrapperProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-right: 1.25rem;
  font-weight: ${(props) => (props.checked ? 600 : 400)};
  color: ${(props) =>
    props.checked
      ? props.theme.color.gray['900']
      : props.theme.color.gray['400']};
  font-size: 1.125rem;
`;

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;

  &:checked + span:after {
    display: block;
  }
`;

interface RadioIconProps {
  checked: boolean;
}

export const RadioIcon = styled.span<RadioIconProps>`
  display: inline-block;
  position: relative;
  margin-right: 1.25rem;
  height: 1.375rem;
  width: 1.375rem;
  border-radius: 50%;
  border: 0.125rem solid
    ${(props) =>
      props.checked
        ? props.theme.color.primary['500']
        : props.theme.color.gray['200']};
  background-color: #fff;

  &:after {
    content: '';
    position: absolute;
    display: ${(props) => (props.checked ? 'block' : 'none')};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.688rem;
    height: 0.688rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.color.primary['500']};
  }
`;
