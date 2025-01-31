import styled from 'styled-components';
import { Backward } from '@/components';
import { Button } from '@/components/common/input/button/style';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  margin-top: -10px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  color: black;
`;

const TitleWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #0f0f0f;
  margin: 40px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;
const BackwardWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 30px;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 40px; /* 버튼이 화면 하단에서 약간 위로 올라오도록 조정 */
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column; /* 버튼을 세로 방향으로 정렬 */
  gap: 12px; /* 버튼 사이 간격 */
  align-items: center;
`;
const OnboardingPage = () => {
  const navigate = useNavigate();
  const handlephone = () => {
    navigate('/auth/phone-number');
  };
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Header>로그인</Header>
      <TitleWrapper>
        <Title>
          인생 2막의 시작
          <br />
          시니어 정보 플랫폼 피클
        </Title>
      </TitleWrapper>
      <ButtonWrapper>
        <Button $color="yellow" $size="small" $width="356px">
          카카오로 5초만에 시작
        </Button>
        <Button
          $color="gray50"
          $size="small"
          $width="356px"
          onClick={handlephone}
        >
          전화번호로 시작
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default OnboardingPage;
