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
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  color: black;
`;

const Section = styled.div`
  background-color: #fff;
  margin-top: 30px;
  margin-bottom: -10px;
  padding: 0px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 0px;
  color: #74777d;
  margin-left: 10px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
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
  font-size: 18px;
  margin-left: 10px;
  color: black;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
`;

const EditButton = styled.button`
  background-color: #f6f8fa;
  border: none;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
  margin-right: 20px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
`;

const ManagePage = () => {
  ///const location = useLocation();
  //const { phone, name, birthDate } = location.state || {};
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
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
          <MenuText>1972.02.04</MenuText>
        </MenuItem>
      </Section>

      <Section>
        <SectionTitle>휴대폰 번호</SectionTitle>
        <MenuItem>
          <MenuText>010-0000-0000</MenuText>
          <EditButton>변경</EditButton>
        </MenuItem>
      </Section>
    </Container>
  );
};

export default ManagePage;
