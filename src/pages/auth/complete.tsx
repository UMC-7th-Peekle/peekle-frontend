import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/components/common/input/button/index';

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
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 0;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const CompletePage = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/event');
  };
  return (
    <Container>
      <Content>
        <Message>
          피클1135님
          <br />
          가입을 환영합니다!
        </Message>
      </Content>
      <ButtonWrapper>
        <Button
          color="primary500"
          size="medium"
          width="412px"
          onClick={handleStart}
        >
          시작하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
};
export default CompletePage;
