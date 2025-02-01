import { theme } from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  height: 35px;
  width: 62px;
  border-radius: 50px;
  background-color: ${theme.color.gray[50]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  svg {
    width: 15px;
    height: 18px;
    path {
      fill: ${theme.color.gray[400]};
    }
  }
`;

const Count = styled.p`
  color: ${theme.color.gray[400]};
  ${theme.typeFace.caption['14B']};
  margin-right: 1px;
`;

export { Container, Count };
