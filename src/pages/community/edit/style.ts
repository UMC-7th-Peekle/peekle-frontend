import { theme } from '@/styles/theme';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
`;

const Appbar = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  flex-shrink: 0;
`;

const Title = styled.h1`
  color: black;
  ${theme.typeFace.subTitle[20]};
`;

const SubmitButton = styled.button<{ $isActive: boolean }>`
  ${theme.typeFace.subTitle[20]};
  background: none;
  border: none;
  color: ${({ $isActive }) =>
    $isActive ? theme.color.primary[500] : theme.color.gray[100]};
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
  transition: color 0.2s ease-in-out;
  ${({ $isActive }) =>
    !$isActive &&
    `
    pointer-events: none;
    opacity: 0.5;
  `};
`;

export { MainContainer, Appbar, Title, SubmitButton };
