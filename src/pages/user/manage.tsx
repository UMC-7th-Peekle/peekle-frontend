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

const Section = styled.div`
  background-color: #fff;
  margin-top: 15px;
  padding: 0px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  color: #9ea4a9;
  margin-left: 10px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
`;

const MenuText = styled.span`
  font-size: 14px;
  margin-left: 10px;
`;

const EditButton = styled.button`
  background-color: #f6f8fa;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 8px;
  margin-right: 20px;
`;

const ManagePage = () => {
  return (
    <Container>
      {/* 상단 로고 + 내 정보 헤더 */}
      <Header>내 정보 관리</Header>

      <Section>
        <SectionTitle>이름</SectionTitle>
        <MenuItem>
          <MenuText>홍길동</MenuText>
        </MenuItem>
      </Section>

      <Section>
        <SectionTitle>생년월일</SectionTitle>
        <MenuItem>
          <MenuText>1972.3.2</MenuText>
        </MenuItem>
      </Section>

      <Section>
        <SectionTitle>휴대폰 번호</SectionTitle>
        <MenuItem>
          <MenuText>010-8888-0000</MenuText>
          <EditButton>변경</EditButton>
        </MenuItem>
      </Section>
    </Container>
  );
};

export default ManagePage;
