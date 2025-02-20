import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { alert } from '@/utils';
import NoticeSVG from '@/assets/images/user/notice.svg?react';
import RequestSVG from '@/assets/images/user/request.svg?react';
import TouSVG from '@/assets/images/user/notice.svg?react';
import ManageSVG from '@/assets/images/user/manage.svg?react';
import LogoutSVG from '@/assets/images/user/logout.svg?react';
import ResignSVG from '@/assets/images/user/resign.svg?react';
import ProfileSVG from '@/assets/images/user/profile.svg?react';
import LogoSVG from '@/assets/images/user/logo.svg?react';
import Logo2SVG from '@/assets/images/user/logo2.svg?react';
import ArrowSVG from '@/assets/images/user/arrow.svg?react';
import { ROUTES } from '@/constants/routes';
import { client } from '@/apis/client';
import { useLocation } from 'react-router-dom';
const Container = styled.div`
  display: fixed;
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
  margin-top: -5px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  justify-content: space-between;
  color: black;
`;
const Logo2Icon = styled(Logo2SVG)`
  margin-right: 185px;
`;

const ProfileSection = styled.div`
  background-color: #fff;
  padding: 20px;
  display: flex; /* Flexbox 활성화 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: space-between;
  margin-top: -20px;
`;

const Username = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin: 10px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const EditButton = styled.button`
  background-color: #f6f8fa;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 8px;
  margin-left: 80px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
`;

const Section = styled.div`
  background-color: #fff;
  padding: 0px;
`;

const SectionTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  color: rgba(116, 119, 125, 1);
`;

const MenuItem = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  gap: 20px;
`;

const MenuText = styled.span`
  font-size: 18px;
  margin-right: 190px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ddd; /* 더 얇고 선명한 회색 */
  margin: 20px 15px; /* 좌우 여백 추가 */
`;

const UserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state?.nickname || '자연32';
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
  const handleLogout = () => {
    alert(
      '로그아웃 하시겠어요?',
      'warning',
      '취소',
      '로그아웃',
      () => console.log('로그아웃 취소됨'),
      async () => {
        try {
          await client({
            method: 'DELETE',
            url: '/auth/logout',
            withCredentials: true,
          });
          localStorage.removeItem('accessToken');
        } catch (error) {
          console.error('🚨 로그아웃 실패:', error);
        } finally {
          navigate(ROUTES.ONBOARDING);
        }
      },
    );
  };
  return (
    <Container>
      {/* 상단 로고 + 내 정보 헤더 */}
      <Header>
        <LogoSVG />
        <Logo2Icon />
      </Header>
      {/* 프로필 영역 */}
      <ProfileSection>
        <ProfileSVG />
        <Username>{nickname}</Username> {/*데이터 가져와야함*/}
        <EditButton onClick={handleEdit}>프로필 수정</EditButton>
      </ProfileSection>
      {/* 고객센터 */}
      <Section>
        <SectionTitle>고객센터</SectionTitle>
        <MenuItem>
          <NoticeSVG />
          <MenuText>공지사항</MenuText>
          <ArrowSVG onClick={handleNotice} />
        </MenuItem>
        <MenuItem>
          <RequestSVG />
          <MenuText>문의하기</MenuText>
          <ArrowSVG onClick={handleRequest} />
        </MenuItem>
        <MenuItem>
          <TouSVG />
          <MenuText>약관 및 정책</MenuText>
          <ArrowSVG onClick={handleTou} />
        </MenuItem>
      </Section>
      <Divider />
      {/* 기타 */}
      <Section>
        <SectionTitle>기타</SectionTitle>
        <MenuItem>
          <ManageSVG />
          <MenuText>내 정보 관리</MenuText>
          <ArrowSVG onClick={handleManage} />
        </MenuItem>
        <MenuItem>
          <LogoutSVG />
          <MenuText>로그아웃</MenuText>
          <ArrowSVG onClick={handleLogout} />
        </MenuItem>
        <MenuItem>
          <ResignSVG />
          <MenuText>회원 탈퇴</MenuText>
          <ArrowSVG onClick={handleResign} />
        </MenuItem>
      </Section>
    </Container>
  );
};

export default UserPage;
