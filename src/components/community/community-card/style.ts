import { theme } from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  ${theme.typeFace.body['16SB']};
  color: ${theme.color.gray[900]};
`;

const Content = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: ${theme.color.gray[500]};
`;

const Date = styled.p`
  ${theme.typeFace.caption['14R']};
  color: ${theme.color.gray[200]};
`;

export { Container, Title, Content, Date };
