import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  align-items: center;
  justify-items: start;
  width: 100%;
`;

export const Title = styled.p`
  ${theme.typeFace.body['16SB']};
  color: ${theme.color.gray[900]};
`;

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
  margin-bottom: 36px;
  ${({ theme }) => theme.typeFace.body['18R']};
  white-space: pre-wrap;
  text-align: center;
`;
