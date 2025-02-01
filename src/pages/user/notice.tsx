import styled from 'styled-components';
import { Backward } from '@/components';
import NotiSVG from '@/assets/images/user/noti.svg?react';

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

const NotiIcon = styled(NotiSVG)`
  position: fixed;
  top: 70px;
  left: -10px;
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
      <NotiIcon />
    </Container>
  );
};

export default NoticePage;
