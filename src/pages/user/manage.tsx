import styled from 'styled-components';
import { useState } from 'react';
import { alert } from '@/utils';
import { clientAuth } from '@/apis/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // ✅ useQueryClient 추가
import { Backward } from '@/components';
import { useNavigate } from 'react-router-dom';

/** 📌 유저 정보 타입 정의 */
interface UserInfoResponse {
  resultType: string;
  error: null | { message: string };
  success?: {
    data: {
      name: string;
      birthdate: string;
      phone: string;
      phoneVerificationSessionId?: string;
      phoneVerificationCode?: string;
    };
  };
}

/** 📌 전화번호 변경 응답 타입 */
interface PhoneUpdateResponse {
  resultType: string;
  error: null | { message: string };
  success?: {
    message: string;
  };
}

/** ✅ 유저 정보 가져오기 (GET /users/me) */
const fetchUserInfo = async (): Promise<UserInfoResponse> => {
  const response = await clientAuth({
    method: 'GET',
    url: '/users/me',
  });
  return response.data as UserInfoResponse;
};

const ManagePage = () => {
  const queryClient = useQueryClient(); // ✅ useQueryClient()로 기존 QueryClient 가져오기
  const navigate = useNavigate();
  /** ✅ 유저 정보 가져오기 */
  const { data, isLoading, error } = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    staleTime: 5 * 60 * 1000, // 5분 동안 캐싱
    retry: 1, // 요청 실패 시 1번 재시도
  });

  /** ✅ 전화번호 변경 API 호출 (PATCH /users/me/phone) */
  const updatePhoneMutation = useMutation({
    mutationFn: async (updateData: {
      phoneVerificationSessionId?: string;
      phone: string;
      phoneVerificationCode?: string;
    }) => {
      const response = await clientAuth({
        method: 'PATCH',
        url: '/users/me/phone',
        data: updateData,
      });
      return response.data as PhoneUpdateResponse;
    },
    onSuccess: (data) => {
      if (data.resultType === 'SUCCESS') {
        alert(
          data.success?.message || '전화번호가 변경되었습니다.',
          'none',
          '확인',
        );
        queryClient.invalidateQueries({ queryKey: ['userInfo'] }); // ✅ 변경 후 유저 정보 다시 불러오기
        setIsEditing(false);
      } else {
        alert('전화번호 변경에 실패했습니다.', 'warning', '확인');
      }
    },
    onError: () => {
      alert('전화번호 변경 중 오류가 발생했습니다.', 'warning', '확인');
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // ✅ 로딩 및 에러 처리
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>사용자 정보를 불러올 수 없습니다.</div>;

  // ✅ API에서 불러온 유저 정보
  const name = data?.success?.data?.name || '정보 없음';
  const birthdate = data?.success?.data?.birthdate || '정보 없음';
  const phone = data?.success?.data?.phone || '정보 없음';
  const phoneVerificationSessionId =
    data?.success?.data?.phoneVerificationSessionId;
  const phoneVerificationCode = data?.success?.data?.phoneVerificationCode;

  const handleEditClick = () => {
    navigate('/user/user-phone');
    setPhoneNumber(phone !== '정보 없음' ? phone : '');
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (!phoneNumber) {
      alert('전화번호를 입력해주세요.', 'warning', '', '확인');
      return;
    }

    // ✅ 전화번호 변경 요청
    updatePhoneMutation.mutate({
      phoneVerificationSessionId,
      phone: phoneNumber,
      phoneVerificationCode,
    });
  };

  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Header>내 정보 관리</Header>

      <Section>
        <SectionTitle>이름</SectionTitle>
        <MenuItem>
          <MenuText>{name}</MenuText>
        </MenuItem>
      </Section>

      <Section>
        <SectionTitle>생년월일</SectionTitle>
        <MenuItem>
          <MenuText>{birthdate}</MenuText>
        </MenuItem>
      </Section>

      <Section>
        <SectionTitle>휴대폰 번호</SectionTitle>
        <MenuItem>
          {isEditing ? (
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))
              }
              maxLength={11}
              placeholder="전화번호 입력"
            />
          ) : (
            <MenuText>
              {phone !== '정보 없음'
                ? phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
                : '정보 없음'}
            </MenuText>
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

/** ✅ 스타일 정의 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
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
`;

const Section = styled.div`
  background-color: #fff;
  margin-top: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  color: #74777d;
  margin-left: 10px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`;

const MenuText = styled.span`
  font-size: 18px;
  margin-left: 10px;
  color: black;
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
`;

const SaveButton = styled(EditButton)`
  background-color: #4caf50;
  color: white;
`;
