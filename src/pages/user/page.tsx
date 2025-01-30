import styled from 'styled-components';
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
`;

const Logo = styled.span`
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-right: 8px;
`;

const ProfileSection = styled.div`
  background-color: #fff;
  padding: 20px;
  display: flex; /* Flexbox 활성화 */
  flex-direction: row; /* 가로 방향 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ddd;
  margin-bottom: 10px;
`;

const Username = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin: 15px;
`;

const EditButton = styled.button`
  background-color: #f6f8fa;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 8px;
  margin-left: 90px;
`;

const Section = styled.div`
  background-color: #fff;
  margin-top: 10px;
  padding: 0px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  font-color: rgba(116, 119, 125, 1);
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
`;

const MenuIcon = styled.span`
  font-size: 18px;
  color: #888;
  margin-right: 10px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ddd; /* 더 얇고 선명한 회색 */
  margin: 20px 15px; /* 좌우 여백 추가 */
`;

const UserPage = () => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate('/user/edit');
  };
  const handleNotice = () => {
    navigate('/user/notice');
  };
  const handleRequest = () => {
    navigate('/user/request');
  };
  const handleTou = () => {
    navigate('/user/tou');
  };
  const handleManage = () => {
    navigate('/user/manage');
  };
  const handleResign = () => {
    navigate('/user/resign');
  };
  return (
    <Container>
      {/* 상단 로고 + 내 정보 헤더 */}
      <Header>
        <Logo>peekle</Logo>내 정보
      </Header>
      {/* 프로필 영역 */}
      <ProfileSection>
        <ProfileImage src="/path/to/profile-image.png" alt="프로필 이미지" />
        <Username>피클1135</Username> {/*데이터 가져와야함*/}
        <EditButton onClick={handleEdit}>프로필 수정</EditButton>
      </ProfileSection>

      {/* 고객센터 */}
      <Section>
        <SectionTitle>고객센터</SectionTitle>
        <MenuItem>
          <MenuText>📢 공지사항</MenuText>
          <MenuIcon onClick={handleNotice}>›</MenuIcon>
        </MenuItem>
        <MenuItem>
          <MenuText>📞 문의하기</MenuText>
          <MenuIcon onClick={handleRequest}>›</MenuIcon>
        </MenuItem>
        <MenuItem>
          <MenuText>📜 약관 및 정책</MenuText>
          <MenuIcon onClick={handleTou}>›</MenuIcon>
        </MenuItem>
      </Section>
      <Divider />
      {/* 기타 */}
      <Section>
        <SectionTitle>기타</SectionTitle>
        <MenuItem>
          <MenuText>⚙️ 내 정보 관리</MenuText>
          <MenuIcon onClick={handleManage}>›</MenuIcon>
        </MenuItem>
        <MenuItem>
          <MenuText>🚪 로그아웃</MenuText>
          <MenuIcon>›</MenuIcon>
        </MenuItem>
        <MenuItem>
          <MenuText>🗑️ 회원 탈퇴</MenuText>
          <MenuIcon onClick={handleResign}>›</MenuIcon>
        </MenuItem>
      </Section>
    </Container>
  );
};

export default UserPage;
