import styled from 'styled-components';
import { Backward } from '@/components';
import ArrowSVG from '@/assets/images/user/arrow.svg?react';

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
  margin-top: 15px;
  padding: 0px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
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
<<<<<<< HEAD
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
`;

const MenuText = styled.span`
  font-size: 18px;
  margin-left: 10px;
  color: black;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
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
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      {/* 상단 로고 + 내 정보 헤더 */}
      <Header>약관 및 정책</Header>
      {/* 필수약관 */}
      <Section>
        <SectionTitle>필수약관</SectionTitle>
        <MenuItem>
          <MenuText>서비스 이용약관 (필수)</MenuText>
          <ArrowSVG />
        </MenuItem>
        <MenuItem>
          <MenuText>개인정보 수집/이용 동의 (필수)</MenuText>
          <ArrowSVG />
        </MenuItem>
      </Section>
      <Divider />
      {/* 선택약관 */}
      <Section>
        <SectionTitle>선택약관</SectionTitle>
        <MenuItem>
          <MenuText>위치 기반 서비스 동의 (선택)</MenuText>
          <ArrowSVG />
        </MenuItem>
        <MenuItem>
          <MenuText>개인 정보 수집/이용 제공 동의 (선택)</MenuText>
          <ArrowSVG />
        </MenuItem>
      </Section>
      <Divider />
      {/* 기타 */}
      <Section>
        <SectionTitle>개인정보</SectionTitle>
        <MenuItem>
          <MenuText>개인정보 처리방침</MenuText>
          <ArrowSVG />
        </MenuItem>
      </Section>
    </Container>
  );
};

export default TouPage;
