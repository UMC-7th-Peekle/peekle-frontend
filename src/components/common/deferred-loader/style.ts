import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Loader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoaderText = styled.span`
  color: ${theme.color.primary[500]};
  ${theme.typeFace.body['18SB']};
`;
