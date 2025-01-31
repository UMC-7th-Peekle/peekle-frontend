import styled from 'styled-components';
import { Backward } from '@/components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  height: 100vh;
  box-sizing: border-box;
`;

const BackwardWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 40px;
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 28px;
  margin-top: 30px;
  margin-bottom: 16px;
  margin-top: 60px;
  color: black;
`;

const Subtitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: ${(props) => props.color || '#666'};
  margin-top: 10px;
  margin-bottom: 16px;
`;

const TosPage = () => {
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Title>피클 서비스 이용약관</Title>
      <Subtitle>
        약관 내용을 불러오는 데 실패했습니다.
        <br />
        다시 시도해주세요.
      </Subtitle>
    </Container>
  );
};

export default TosPage;
