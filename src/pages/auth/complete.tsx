import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Message = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 0;
`;

const Button = styled.button`
  background-color: #4aa662;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;

  &:hover {
    background-color: #3e8a54;
  }
`;

const CompletePage = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/event');
  };
  return (
    <Container>
      <Content>
        <Message>가입을 환영합니다!</Message>
      </Content>
      <Button onClick={handleStart}>시작하기</Button>
    </Container>
  );
};
export default CompletePage;
