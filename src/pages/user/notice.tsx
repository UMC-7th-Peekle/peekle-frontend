import styled from 'styled-components';
import { Backward } from '@/components';

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

const NoticeSection = styled.div`
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const Notice = styled.h2`
  font-size: 16px;
  color: #9ea4a9;
  margin: 40px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;
const BackwardWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 30px;
`;

const NoticePage = () => {
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Header>공지사항</Header>
      <NoticeSection>
        <Notice>아직 공지사항 없어요</Notice>
      </NoticeSection>
    </Container>
  );
};

export default NoticePage;
