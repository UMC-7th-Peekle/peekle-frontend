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

const MenuIcon = styled.span`
  font-size: 18px;
  color: #888;
  margin-right: 10px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ddd; /* 더 얇고 선명한 회색 */
  margin: 20px 10px; /* 좌우 여백 추가 */
  justify-content: center;
`;

const TouPage = () => {
  return (
    <Container>
      {/* 상단 로고 + 내 정보 헤더 */}
      <Header>약관 및 정책</Header>
      {/* 필수약관 */}
      <Section>
        <SectionTitle>필수약관</SectionTitle>
        <MenuItem>
          <MenuText>서비스 이용약관 (필수)</MenuText>
          <MenuIcon>›</MenuIcon>
        </MenuItem>
        <MenuItem>
          <MenuText>개인정보 수집/이용 동의 (필수)</MenuText>
          <MenuIcon>›</MenuIcon>
        </MenuItem>
      </Section>
      <Divider />
      {/* 선택약관 */}
      <Section>
        <SectionTitle>선택약관</SectionTitle>
        <MenuItem>
          <MenuText>위치 기반 서비스 동의 (선택)</MenuText>
          <MenuIcon>›</MenuIcon>
        </MenuItem>
        <MenuItem>
          <MenuText>개인 정보 수집/이용 제공 동의 (선택)</MenuText>
          <MenuIcon>›</MenuIcon>
        </MenuItem>
      </Section>
      <Divider />
      {/* 기타 */}
      <Section>
        <SectionTitle>개인정보</SectionTitle>
        <MenuItem>
          <MenuText>개인정보 처리방침</MenuText>
          <MenuIcon>›</MenuIcon>
        </MenuItem>
      </Section>
    </Container>
  );
};

export default TouPage;
