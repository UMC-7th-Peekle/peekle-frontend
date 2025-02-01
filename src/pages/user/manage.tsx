import styled from 'styled-components';
import { Backward } from '@/components';
import { useState } from 'react';
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
const Input = styled.input`
  font-size: 18px;
  padding: 5px;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
  width: 150px;
  text-align: center;
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
const SaveButton = styled(EditButton)`
  background-color: #f6f8fa;
`;
const ManagePage = () => {
  ///const location = useLocation();
  //const { phone, name, birthDate } = location.state || {};
  const [phone, setPhone] = useState('01000000000');
  const [isEditing, setIsEditing] = useState(false);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 입력 가능
    setPhone(value);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
    console.log('✅ 새로운 번호:', phone);
  };
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
          <MenuText>구자연</MenuText>
        </MenuItem>
      </Section>

      <Section>
        <SectionTitle>생년월일</SectionTitle>
        <MenuItem>
          <MenuText>2002.08.05</MenuText>
        </MenuItem>
      </Section>

      <Section>
        <SectionTitle>휴대폰 번호</SectionTitle>
        <MenuItem>
          {isEditing ? (
            <Input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={11} // 📌 최대 11자리 제한
              placeholder="전화번호 입력"
            />
          ) : (
            <MenuText>
              {phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
            </MenuText> // 📌 010-0000-0000 형식
          )}
          {isEditing ? (
            <SaveButton onClick={handleSaveClick}>저장</SaveButton>
          ) : (
            <EditButton onClick={handleEditClick}>변경</EditButton>
          )}
        </MenuItem>
      </Section>
    </Container>
  );
};

export default ManagePage;
