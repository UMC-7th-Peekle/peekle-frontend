import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common/input/button/index';
import CompleteSVG from '@/assets/images/auth/complete.svg?react';

const Container = styled.div`
  display: fixed;
  flex-direction: column;
  background-color: #ffffff;
`;

const Content = styled.div`
  display: fixed;
  align-items: center;
`;

const Message = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 350px;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const CompleteIcon = styled(CompleteSVG)`
  position: fixed;
  top: 56px;
  right: -10px;
`;
const Highlight = styled.div`
  color: #4aa662;
`;
const CompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state?.nickname || '피클1135';
  const handleStart = () => {
    navigate(ROUTES.EVENT);
    localStorage.removeItem('phone');
    localStorage.removeItem('phoneVerificationSessionId');
    localStorage.removeItem('alreadyRegisteredUser');
  };
  return (
    <Container>
      <Content>
        <CompleteIcon />
        <Message>
          <Highlight>{nickname}</Highlight>
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
