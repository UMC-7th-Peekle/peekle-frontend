import styled from 'styled-components';

// CheckboxCard 컨테이너 스타일
export const StyledCheckboxCard = styled.div<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;
  width: 181px;
  height: 55px;
  padding: 1rem;
  border: 1px solid
    ${({ $isChecked, theme }) =>
      $isChecked ? theme.color.primary['500'] : theme.color.gray['100']};
  border-radius: 0.5rem;
  background-color: ${({ $isChecked, theme }) =>
    $isChecked ? theme.color.primary['50'] : 'transparent'};
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    border-color: ${({ $isChecked, theme }) =>
      $isChecked ? theme.color.primary['500'] : theme.color.gray['200']};
  }
`;

// Card 문구 스타일
export const CardText = styled.span<{ $isChecked: boolean }>`
  margin-left: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ $isChecked, theme }) =>
    $isChecked ? theme.color.gray['900'] : theme.color.gray['400']};
  user-select: none;
`;
