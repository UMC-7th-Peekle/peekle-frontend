import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Backward } from '@/components';
import { BottomSheet, Button } from '@/components';
import { useBottomSheetStore } from '@/stores';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  height: 100vh;
  box-sizing: border-box;
`;

const BackwardWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 25px;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 16px;
  margin-left: -10px;
  color: black;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${(props) => props.color || '#666'};
  margin-top: -10px;
  margin-bottom: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  margin-left: -10px;
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  margin-left: -10px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  display: block;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;

const Input = styled.input`
  width: 110%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  background-color: #ffffff;
  &:focus {
    border-bottom: 2px solid #4aa662;
  }
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const ModalContent = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 400px;
  text-align: left;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: black;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 0px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;

const AgreementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
`;

const AgreementItem = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 20px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const CompleteButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#4aa662')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
  margin-top: 20px;
`;

const PersonalDataPage = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [birthError, setBirthError] = useState('');
  const { setActiveBottomSheet } = useBottomSheetStore();
  const [agreements, setAgreements] = useState({
    toss: false,
    privacy: false,
    terms_location: false,
  });
  const [allChecked, setAllChecked] = useState(false);

  const validNickname = (value: string) => {
    const re = /^[\u3131-\uD79D\uAC00-\uD7A3a-zA-Z0-9]+$/;
    return re.test(value);
  };
  const validBirth = (value: string) => {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(value);
  };
  const handleNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value;
    if (!validNickname(value) && value !== '') {
      setError('한글, 영문, 숫자만 사용할 수 있습니다.');
    } else {
      setError('');
    }
    setNickname(value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value.length > 0 && value.length < 3) {
      setNameError('이름을 모두 입력해주세요');
    } else {
      setNameError('');
    }
    setName(value);
  };
  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (!validBirth(value) && value !== '') {
      setBirthError('알맞은 생년월일을 입력해주세요.');
    } else {
      setBirthError('');
    }
    setBirth(value);
  };
  // 모달창 닫기
  const handleAllCheck = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setAgreements({
      toss: newChecked,
      privacy: newChecked,
      terms_location: newChecked,
    });
  };
  const handleAgreementChange = (key: keyof typeof agreements): void => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const navigate = useNavigate();
  const handleComplete = () => {
    navigate('/auth/complete');
    navigate('/user/manage', {
      state: {
        name,
        birth,
      },
    });
  };
  const getCurrentTitle = () => {
    if (!nickname) return '사용하실 닉네임을\n입력해주세요';
    if (!name) return '이름을 입력해주세요';
    return '생년월일을 입력해주세요';
  };
  const allAgreementsChecked = Object.values(agreements).every((val) => val);
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Title>{getCurrentTitle()}</Title>
      <InputWrapper>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          type="text"
          id="nickname"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={handleNicknameChange}
        />
      </InputWrapper>
      {error && <Subtitle color="red">{error}</Subtitle>}
      {!error && <Subtitle>가입 후에도 수정할 수 있어요.</Subtitle>}
      {nickname && !error && (
        <InputWrapper>
          <Label htmlFor="name">이름</Label>
          <Input
            type="text"
            id="name"
            placeholder="이름 입력"
            value={name}
            onChange={handleNameChange}
          />
        </InputWrapper>
      )}
      {nameError && <Subtitle color="red">{nameError}</Subtitle>}
      {name && !nameError && (
        <InputWrapper>
          <Label htmlFor="birth">생년월일</Label>
          <Input
            type="text"
            id="birth"
            placeholder="YYYY-MM-DD"
            value={birth}
            onChange={handleBirthChange}
          />
        </InputWrapper>
      )}
      {birthError && <Subtitle color="red">{birthError}</Subtitle>}
      <ButtonWrapper>
        <Button
          color="primary500"
          size="small"
          width="412px"
          disabled={!nickname || !name || !birth}
          onClick={() => setActiveBottomSheet('next')}
        >
          다음
        </Button>
      </ButtonWrapper>
      <BottomSheet id="next">
        <ModalContent>
          <ModalTitle>약관에 동의해주세요</ModalTitle>
          <ModalSubtitle>
            서비스를 이용하기 위해서는 동의가 필요해요.
          </ModalSubtitle>
          <AgreementWrapper>
            <AgreementItem>
              <Checkbox
                type="checkbox"
                checked={allChecked}
                onChange={handleAllCheck}
              />
              <span>네, 모두 동의합니다.</span>
            </AgreementItem>
            <AgreementItem>
              <Checkbox
                type="checkbox"
                checked={agreements.toss}
                onChange={() => handleAgreementChange('toss')}
              />
              <span>(필수) 서비스 이용약관</span>
              <Link to="/auth/toss">보기</Link>
            </AgreementItem>
            <AgreementItem>
              <Checkbox
                type="checkbox"
                checked={agreements.privacy}
                onChange={() => handleAgreementChange('privacy')}
              />
              <span>(필수) 개인정보 처리방침</span>
              <Link to="/auth/privacy">보기</Link>
            </AgreementItem>
            <AgreementItem>
              <Checkbox
                type="checkbox"
                checked={agreements.terms_location}
                onChange={() => handleAgreementChange('terms_location')}
              />
              <span>(필수) 위치 기반 서비스 이용약관</span>
              <Link to="/auth/terms-location">보기</Link>
            </AgreementItem>
          </AgreementWrapper>
          <CompleteButton
            disabled={!allAgreementsChecked}
            onClick={handleComplete}
          >
            가입 완료
          </CompleteButton>
        </ModalContent>
      </BottomSheet>
    </Container>
  );
};

export default PersonalDataPage;
