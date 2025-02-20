import styled from 'styled-components';
import { Backward } from '@/components';
import KakaoSVG from '@/assets/images/user/kakao.svg?react';
import ArrowSVG from '@/assets/images/user/arrow.svg?react';
const RequestPage = () => {
  const handleArrowClick = () => {
    window.open(
      'https://open.kakao.com/o/sv8H2c8g',
      '_blank',
      'noopener noreferrer',
    );
  };
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Header>문의하기</Header>
      <Box onClick={handleArrowClick} style={{ cursor: 'pointer' }}>
        <LeftContent>
          <KakaoIcon />
          <TextContainer>
            <BoxTitle>카카오톡 채팅방으로 문의하기</BoxTitle>
            <BoxText>평일: 09:00 ~ 17:00</BoxText>
            <BoxText>토 · 일 · 공휴일 휴무</BoxText>
          </TextContainer>
        </LeftContent>
        <ArrowSVG onClick={handleArrowClick} style={{ cursor: 'pointer' }} />
      </Box>
    </Container>
  );
};

export default RequestPage;

/* ✅ Styled Components */
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
  left: 25px;
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

/* ✅ 박스 크기를 작게 조절 */
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 아이콘을 오른쪽에 배치 */
  background-color: #f6f8fa;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  width: 100%; /* ✅ 박스 크기 줄이기 */
  height: 90px; /* ✅ 높이 조절 */
  margin-left: auto;
  margin-right: auto;
`;

/* ✅ 왼쪽 콘텐츠 (아이콘 + 텍스트) */
const LeftContent = styled.div`
  display: flex;
  align-items: center;
`;

const KakaoIcon = styled(KakaoSVG)`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoxTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 2px;
  color: black;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
`;

const BoxText = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;
