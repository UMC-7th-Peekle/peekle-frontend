import { useState } from 'react';
import styled from 'styled-components';
import { Backward } from '@/components';
import { Button } from '@/components/common/input/button/index';
import WomanSVG from '@/assets/images/auth/w.svg?react';

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

const Option = styled.div<{ selected: boolean }>`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 180px;
  border: 2px solid ${(props) => (props.selected ? 'rgb(74, 166, 98)' : '#ccc')};
  border-radius: 8px;
  background-color: ${(props) =>
    props.selected ? 'rgb(209, 235, 216)' : '#f9f9f9'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgb(74, 166, 98);
  }

  img {
    width: 48px;
    height: 48px;
    margin-top: 25px;
  }

  span {
    font-size: 16px;
    color: #333;
    margin-top: 10px;
  }
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
  margin-top: 60px;
`;
const Icon = styled.div`
  position: fixed;
  bottom: 20;
  top: 40;
`;
const WomanIcon = styled(WomanSVG)`
  width: 16px;
  height: 16px;
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
          <Option
            selected={selectedGender === '남성'}
            onClick={() => handleSelectGender('남성')}
          >
            <img src="male-icon.png" alt="남성" />
            <span>남성</span>
          </Option>
          <Option
            selected={selectedGender === '여성'}
            onClick={() => handleSelectGender('여성')}
          >
            <Icon>
              <WomanIcon />
            </Icon>
            <span>여성</span>
          </Option>
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
