import styled from 'styled-components';
import { Backward } from '@/components';

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

const ProfileSection = styled.div`
  background-color: #fff;
  padding: 20px;
  display: flex; /* Flexbox 활성화 */
  flex-direction: row; /* 가로 방향 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #ddd;
  margin-bottom: 0px;
`;

const Nickname = styled.div`
  background-color: #fff;
  margin-top: 10px;
  padding: 0px;
`;

const NicknameTitle = styled.h3`
  font-size: 16px;
  margin-bottom: -20px;
  color: black;
  padding: 10px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  width: 325px; /* 가로 길이 */
  height: 50px; /* 세로 길이 */
  padding: 12px 16px; /* 내부 여백 */
  border-radius: 8px; /* 둥근 테두리 */
  font-size: 16px; /* 글자 크기 */
  border: 1px solid #eaeced;
  margin-left: 30px;

  &:focus {
    outline: none;
    border: 1px solid #04a662;
  }
  background-color: #ffffff;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;
const NicknameSubtitle = styled.p`
  font-size: 14px;
  padding: 10px;
  margin-top: -15px;
  color: #9ea4a9;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;
const EditPage = () => {
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Header>프로필 수정</Header>
      <ProfileSection>
        <ProfileImage src="/path/to/profile-image.png" alt="" />
      </ProfileSection>

      <Nickname>
        <NicknameTitle>닉네임</NicknameTitle>
        <InputWrapper>
          <Input type="text" id="nickname" placeholder="닉네임 입력" />
        </InputWrapper>
        <NicknameSubtitle>
          닉네임을 수정하면 30일간 변경할 수 없어요.
        </NicknameSubtitle>
      </Nickname>
    </Container>
  );
};

export default EditPage;
