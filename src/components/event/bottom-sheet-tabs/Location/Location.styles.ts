import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const Button = styled.button<{ $isActive: boolean }>`
  height: 30px; // 임시
  align-self: flex-start;
  ${({ $isActive, theme }) =>
    $isActive ? theme.typeFace.body['18SB'] : theme.typeFace.body['18R']};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.gray[900] : theme.color.gray[400]};

  &:last-child {
    margin-bottom: -28px;
  }
`;
