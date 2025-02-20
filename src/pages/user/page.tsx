import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { alert } from '@/utils';
import NoticeSVG from '@/assets/images/user/notice.svg?react';
import RequestSVG from '@/assets/images/user/request.svg?react';
import TouSVG from '@/assets/images/user/notice.svg?react';
import ManageSVG from '@/assets/images/user/manage.svg?react';
import LogoutSVG from '@/assets/images/user/logout.svg?react';
import ResignSVG from '@/assets/images/user/resign.svg?react';
import LogoSVG from '@/assets/images/user/logo.svg?react';
import Logo2SVG from '@/assets/images/user/logo2.svg?react';
import ArrowSVG from '@/assets/images/user/arrow.svg?react';
import { ROUTES } from '@/constants/routes';
import { client } from '@/apis/client';
import { useGetUsersMe, UserInfoType } from './hook/useGetUsersMe';
import { ErrorFallback } from '@/components';
import { theme } from '@/styles/theme';
import { Navbar } from '@/layouts';
const Container = styled.div`
  flex-direction: column;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 11px;
  font-family: 'Pretendard';
  font-weight: 600;
  color: black;
  gap: 8px;
  padding: 0 16px;
`;
const Logo2Icon = styled(Logo2SVG)`
  margin-right: 185px;
`;

const ProfileSection = styled.div`
  background-color: #fff;
  display: flex; /* Flexbox 활성화 */
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 20px;
  padding: 0 16px;
  justify-content: space-between;
`;

const Line = styled.div`
  margin: 16px 0;
  width: 100%;
  height: 8px;
  background-color: ${theme.color.gray[50]};
`;

const Username = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: black;
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
  padding: 0 16px;
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

const ProfileImage = styled.div<{ $image: string; $size?: string }>`
  width: ${({ $size }) => $size || '32px'};
  height: ${({ $size }) => $size || '32px'};
  border-radius: 100%;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProfileNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

const UserPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetUsersMe();
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

  if (isLoading) {
    return (
      <Container>
        {/* 상단 로고 + 내 정보 헤더 */}
        <Header>
          <LogoSVG />
          <Logo2Icon />
        </Header>
        {/* 프로필 영역 */}
        <ProfileSection>
          <EditButton onClick={handleEdit}>프로필 수정</EditButton>
        </ProfileSection>
        <Line />
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
  }

  if (error || !data) {
    return <ErrorFallback />;
  }

  const userInfo: UserInfoType = data?.success?.data;

  return (
    <>
      <Container>
        {/* 상단 로고 + 내 정보 헤더 */}
        <Header>
          <LogoSVG />
          <Logo2Icon />
        </Header>
        {/* 프로필 영역 */}
        <ProfileSection>
          <ProfileNameWrapper>
            <ProfileImage $image={userInfo.profileImage} $size={'60px'} />
            <Username>{userInfo.nickname}</Username> {/*데이터 가져와야함*/}
          </ProfileNameWrapper>
          <EditButton onClick={handleEdit}>프로필 수정</EditButton>
        </ProfileSection>
        <Line />
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
      <Navbar />
    </>
  );
};

export default UserPage;
