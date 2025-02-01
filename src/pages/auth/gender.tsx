import { useState } from 'react';
import styled from 'styled-components';
import { Backward } from '@/components';
import { Button } from '@/components/common/input/button/index';
import ManDefaultSVG from '@/assets/images/auth/mandefault.svg?react';
import WomanSVG from '@/assets/images/auth/woman.svg?react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: white;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 28px;
  text-align: left;
  width: 100%;
  margin-top: 40px;
  margin-left: 3px;
  color: black;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #666;
  margin-top: -10px;
  margin-left: 1px;
`;

const GenderOptions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const BackwardWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 40px;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const GenderSelectionPage = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleSelectGender = (gender: string) => {
    setSelectedGender(gender);
  };

  return (
    <>
      <Container>
        <BackwardWrapper>
          <Backward />
        </BackwardWrapper>
        <Title>성별을 선택해주세요</Title>
        <Subtitle>더 나은 서비스 제공과 통계 분석에 활용될 수 있어요.</Subtitle>
        <GenderOptions>
          <ManDefaultSVG onClick={() => handleSelectGender('남성')} />
          <WomanSVG onClick={() => handleSelectGender('여성')} />
        </GenderOptions>
        <ButtonWrapper>
          <Button
            color="primary500"
            size="medium"
            width="412px"
            disabled={!selectedGender}
          >
            다음
          </Button>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default GenderSelectionPage;
