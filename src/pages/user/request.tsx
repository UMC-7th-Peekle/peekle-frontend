import styled from 'styled-components';
import { Backward } from '@/components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
`;

const BackwardWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 25px;
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

const Box = styled.div`
  background-color: #f6f8fa;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
`;

const BoxTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  color: black;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
`;
const BoxText = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;
const Icon = styled.span`
  font-size: 18px;
  color: #888;
  margin-right: 10px;
`;
const RequestPage = () => {
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Header>문의하기</Header>
      <Box>
        <BoxTitle>카카오톡 채팅방으로 문의하기</BoxTitle>
        <BoxText>
          평일: 09:00 ~ 17:00
          <br />토 · 일 · 공휴일 휴무
        </BoxText>
        <Icon>›</Icon>
      </Box>
    </Container>
  );
};

export default RequestPage;
