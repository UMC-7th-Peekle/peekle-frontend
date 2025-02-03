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
  left: 30px;
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
  color: black;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  margin-left: 5px;
  padding: 10px;
  color: black;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const Box = styled.div`
  background-color: #f6f8fa;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const BoxTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  color: #74777d;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;

const BoxText = styled.p`
  font-size: 16px;
  color: black;
  margin: 0;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const Footer = styled.div`
  display: flex;

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  background-color: #fff;
`;

const CancelButton = styled.button`
  width: 35%;
  background-color: #f0f0f0;
  color: #333;
  font-size: 16px;
  border: none;
  cursor: pointer;
  padding: 16px;
  font-weight: bold;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const DeleteButton = styled.button`
  width: 65%;
  background-color: #4aa662;
  color: white;
  font-size: 16px;
  border: none;
  padding: 16px;
  font-weight: bold;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const SleeperPage = () => {
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Header></Header>
      <Title>
        다시 돌아오셨네요!
        <br />
        계정을 복구할까요?
      </Title>
      <Box>
        <BoxTitle>휴면 전환 일자</BoxTitle>
        <BoxText>2025년 1월 1일</BoxText>
      </Box>
      <Box>
        <BoxTitle>휴면 계정 지속 일자</BoxTitle>
        <BoxText>2025년 1월 1일 ~ 2025년 1월 7일</BoxText>
      </Box>
      <Box>
        <BoxTitle>계정 삭제 예정일</BoxTitle>
        <BoxText>2025년 01월 08일</BoxText>
      </Box>
      <Footer>
        <CancelButton>아니오</CancelButton>
        <DeleteButton>네,복구할래요</DeleteButton>
      </Footer>
    </Container>
  );
};

export default SleeperPage;
