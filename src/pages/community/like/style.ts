import { theme } from '@/styles/theme';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Appbar = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: black;
  ${theme.typeFace.subTitle[20]};
`;

const SizedBox = styled.div`
  width: 20px;
`;

export { MainContainer, Appbar, Title, SizedBox };
