import styled from 'styled-components';
import { Backward, BottomSheet } from '@/components';
import EditProfileSVG from '@/assets/images/user/editProfile.svg?react';
import { alert } from '@/utils';
import { useBottomSheetStore } from '@/stores';
import { clientAuth } from '@/apis/client';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface NicknameResponse {
  resultType: 'SUCCESS' | 'FAIL';
  error?: {
    errorCode: string;
    reason: string;
    data: string | null;
  } | null;
  success?: {
    message: string;
  } | null;
}

interface ProfileResponse {
  resultType: 'SUCCESS' | 'FAIL';
  error?: {
    errorCode: string;
    reason: string;
    data: string | null;
  } | null;
  success?: {
    message: string;
  } | null;
}
const EditPage = () => {
  const [nickname, setNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setActiveBottomSheet } = useBottomSheetStore();

  const handlenNickname = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleFinish = () => {
    alert(
      '정말 닉네임을 변경할까요?\n닉네임은 30일마다 1번 수정할 수 있어요.',
      'warning',
      '취소',
      '변경',
      () => {},
      () => {
        handleConfirmed();
      },
    );
  };

  const handleConfirmed = async () => {
    try {
      const response = await clientAuth({
        method: 'PATCH',
        url: '/users/me/nickname',
        data: { nickname },
      });
      const data = response.data as NicknameResponse;

      if (data.resultType === 'SUCCESS') {
        alert(
          data.success?.message || '닉네임을 변경했습니다.',
          'none',
          '확인',
        );
        navigate('/user', { state: { nickname } });
      } else {
        alert(
          data.error?.reason || '닉네임 변경 중 오류가 발생했습니다.',
          'none',
          '확인',
        );
      }
    } catch (error) {
      console.error('API 요청 실패:', error);
      alert('서버와의 통신 중 오류가 발생했습니다.', 'none', '확인');
    }
  };

  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImageUrl(imageUrl);

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await clientAuth({
        method: 'PATCH',
        url: '/users/me/profile-image',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = response.data as ProfileResponse;

      if (data.resultType === 'SUCCESS') {
        alert('프로필 이미지가 변경되었습니다.', 'none', '확인');
      } else {
        alert(data.error?.reason || '프로필 이미지 변경 실패', 'none', '확인');
      }
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
      alert('프로필 이미지 변경 중 오류가 발생했습니다.', 'none', '확인');
    }
  };

  const handleProfileDelete = async () => {
    try {
      const response = await clientAuth({
        method: 'DELETE',
        url: '/users/me/profile-image',
      });
      const data = response.data as ProfileResponse;
      if (data.resultType === 'SUCCESS') {
        setProfileImageUrl(null);
        alert('프로필 이미지가 삭제되었습니다.', 'none', '확인');
      } else {
        alert(data.error?.reason || '프로필 이미지 삭제 실패', 'none', '확인');
      }
    } catch (error) {
      console.error('프로필 이미지 삭제 실패:', error);
      alert('프로필 이미지 삭제 중 오류가 발생했습니다.', 'none', '확인');
    }
  };
  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Footer>
        <Header>프로필 수정</Header>
        <Header2 onClick={handleFinish}>완료</Header2>
      </Footer>
      <ProfileSection>
        {profileImageUrl ? (
          <ProfileImage
            src={profileImageUrl}
            alt="프로필 이미지"
            onClick={openFilePicker}
          />
        ) : (
          <EditProfileSVG onClick={() => setActiveBottomSheet('profile')} />
        )}
      </ProfileSection>
      <Nickname>
        <NicknameTitle>닉네임</NicknameTitle>
        <InputWrapper>
          <Input
            type="text"
            value={nickname}
            id="nickname"
            placeholder="닉네임 입력"
            onChange={handlenNickname}
          />
        </InputWrapper>
        <NicknameSubtitle>
          닉네임을 수정하면 30일간 변경할 수 없어요.
        </NicknameSubtitle>
      </Nickname>
      <BottomSheet id="profile" shouldShowLine={true}>
        <BottomSheetItem onClick={openFilePicker}>
          프로필 사진 변경
        </BottomSheetItem>
        <BottomSheetItem onClick={handleProfileDelete}>
          프로필 사진 삭제
        </BottomSheetItem>
        <BottomSheetClose onClick={() => setActiveBottomSheet(null)}>
          닫기
        </BottomSheetClose>
      </BottomSheet>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleProfileChange}
        accept="image/*"
      />
    </Container>
  );
};

export default EditPage;

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
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  margin-left: 120px;
  margin-top: -10px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  color: black;
`;
const Header2 = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-top: -10px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  color: #4aa662;
`;

const ProfileSection = styled.div`
  background-color: #fff;
  padding: 20px;
  display: flex; /* Flexbox 활성화 */
  flex-direction: row; /* 가로 방향 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center;
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
const BottomSheetItem = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding: 15px 0;
  width: 100%;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const BottomSheetClose = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #9ea4a9;
  padding: 15px 0;
  width: 100%;
  text-align: center;
  cursor: pointer;
  border-top: 1px solid #dcdcdc;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
