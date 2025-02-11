import { theme } from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: white;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 28px;
  text-align: left;
  width: 100%;
  margin-top: 40px;
  margin-left: 3px;
  color: black;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #666;
  margin-top: -10px;
  margin-left: 1px;
`;

const GenderOptions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button<{ $isGender: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  width: 100%;
  background-color: ${({ $isGender }) =>
    $isGender ? theme.color.primary[500] : theme.color.gray[100]};
  color: ${({ $isGender }) =>
    $isGender ? theme.color.gray[0] : theme.color.gray[200]};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  ${theme.typeFace.subTitle[20]};
  ${({ $isGender }) => !$isGender && 'pointer-events: none;'}
`;

export default Button;

export { Container, Button, Subtitle, GenderOptions, Title };
