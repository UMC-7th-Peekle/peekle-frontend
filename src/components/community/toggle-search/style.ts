import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;

    /* 기본 상태 */
    path {
      stroke: ${theme.color.gray[600]};
      stroke-width: 2px;
    }
  }

  /* hover 상태 */
  &:hover path {
    stroke: ${theme.color.gray[200]};
  }
`;
