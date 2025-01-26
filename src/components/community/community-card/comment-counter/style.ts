import { theme } from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${theme.typeFace.caption['14B']};
  color: ${theme.color.gray[200]};
  gap: 4px;
  svg {
    width: 18px;
    height: 18px;

    /* 기본 상태 */
    path {
      fill: ${theme.color.gray[200]};
    }
  }
`;

export { Container };
