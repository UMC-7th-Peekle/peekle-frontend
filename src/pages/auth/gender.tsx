import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  height: 60vh;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-left: 0px;
  color: black;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 20px;
`;

const GenderOptions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const Option = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 220px;
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
    margin-top: 60px;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NextButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007BFF')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const GenderSelectionPage = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleSelectGender = (gender: string) => {
    setSelectedGender(gender);
  };

  return (
    <>
      <Container>
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
            <img src="female-icon.png" alt="여성" />
            <span>여성</span>
          </Option>
        </GenderOptions>
        <Footer>
          <NextButton disabled={!selectedGender}>다음</NextButton>
        </Footer>
      </Container>
    </>
  );
};

export default GenderSelectionPage;
