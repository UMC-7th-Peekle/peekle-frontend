import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const NoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  align-items: center;
  justify-items: start;
`;

export const SubTitle = styled.h2`
  color: ${theme.color.gray[500]};
  margin-top: 86px;
  ${({ theme }) => theme.typeFace.body['18R']};
  white-space: pre-wrap;
  text-align: center;
`;
