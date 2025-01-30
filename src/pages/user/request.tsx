import styled from 'styled-components';

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
`;

const RequestPage = () => {
  return (
    <Container>
      <Header>문의하기</Header>
      <NoticeSection>
        <Notice></Notice>
      </NoticeSection>
    </Container>
  );
};

export default RequestPage;
