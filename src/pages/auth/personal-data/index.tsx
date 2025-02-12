import { useState } from 'react';
import * as S from './style';
import { useBottomSheetStore } from '@/stores';
import { Link } from 'react-router-dom';
import { BottomSheet, Button, FixedBackward } from '@/components';
import { ZodError } from 'zod';
import {
  PostAuthRegisterKakaoParams,
  PostAuthRegisterKakaoSchema,
  PostAuthRegisterParams,
  PostAuthRegisterSchema,
  usePostAuthRegister,
} from '@/pages/auth/hook/mutation/usePostRegister';

export default function PersonalDataPage() {
  const { setActiveBottomSheet } = useBottomSheetStore();
  const registerLocal = usePostAuthRegister(false); // 로컬 회원가입
  const registerOAuth = usePostAuthRegister(true); // OAuth 회원가입

  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [nicknameStatus, setNicknameStatus] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [agreements, setAgreements] = useState({
    toss: false,
    privacy: false,
    terms_location: false,
  });
  const [allChecked, setAllChecked] = useState(false);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);

    if (
      !/^[\u3131-\uD79D\uAC00-\uD7A3a-zA-Z0-9]+$/.test(value) &&
      value !== ''
    ) {
      setNicknameStatus('error');
      setNicknameMessage('한글, 영문, 숫자만 사용할 수 있습니다.');
      return;
    } else {
      setNicknameStatus('');
      setNicknameMessage('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirth(value);
  };

  // ✅ 회원가입 요청 함수
  const handleRegister = () => {
    try {
      const isOAuth = Boolean(localStorage.getItem('kakao-id'));

      // ✅ `gender` 값이 'male' 또는 'female'인지 확인 후 변환
      const gender = localStorage.getItem('gender') as 'male' | 'female';
      if (gender !== 'male' && gender !== 'female') {
        console.error('잘못된 성별 값:', gender);
        return;
      }

      // ✅ 기본 회원가입 데이터 (로컬 회원가입 공통)
      let rawData: PostAuthRegisterParams | PostAuthRegisterKakaoParams = {
        name,
        nickname,
        birthdate: birth,
        gender, // 🔥 이제 TypeScript가 올바른 타입으로 인식
        email: localStorage.getItem('email') || '',
        phone: localStorage.getItem('phone') || '',
        phoneVerificationSessionId:
          localStorage.getItem('phoneVerificationSessionId') || '',
        terms: [
          {
            termId: 1,
            isAgreed:
              agreements.toss &&
              agreements.privacy &&
              agreements.terms_location,
          },
        ],
      };

      if (isOAuth) {
        // ✅ `rawData`를 OAuth 회원가입 스키마에 맞게 확장
        rawData = {
          ...rawData,
          oauthId: Number(localStorage.getItem('kakao-id')),
          oauthType: 'kakao',
        } as PostAuthRegisterKakaoParams;
      }

      // ✅ Zod 검증
      const validatedData = isOAuth
        ? PostAuthRegisterKakaoSchema.parse(rawData)
        : PostAuthRegisterSchema.parse(rawData);

      // ✅ 불필요한 localStorage 데이터 삭제
      localStorage.clear();

      // ✅ 회원가입 요청 실행 (OAuth 또는 로컬)
      if (isOAuth) {
        registerOAuth.mutate(validatedData);
      } else {
        registerLocal.mutate(validatedData);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('회원가입 데이터 검증 실패:', error.errors);
      } else {
        console.error('예상치 못한 오류 발생:', error);
      }
    }
  };

  const handleAllCheck = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setAgreements({
      toss: newChecked,
      privacy: newChecked,
      terms_location: newChecked,
    });
  };

  const handleAgreementChange = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <S.Container>
      <FixedBackward />
      <S.Title>
        {!nickname
          ? '사용하실 닉네임을\n입력해주세요'
          : !name
            ? '이름을 입력해주세요'
            : '생년월일을 입력해주세요'}
      </S.Title>

      <S.InputWrapper>
        <S.Label htmlFor="nickname">닉네임</S.Label>
        <S.Input
          type="text"
          id="nickname"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={handleNicknameChange}
          style={{
            borderBottom:
              nicknameStatus === 'error'
                ? '2px solid red'
                : nicknameStatus === 'success'
                  ? '2px solid green'
                  : '1px solid #ccc',
          }}
        />
      </S.InputWrapper>
      {nicknameMessage && (
        <S.Subtitle color={nicknameStatus === 'error' ? 'red' : 'green'}>
          {nicknameMessage}
        </S.Subtitle>
      )}

      {nickname && (
        <S.InputWrapper>
          <S.Label htmlFor="name">이름</S.Label>
          <S.Input
            type="text"
            id="name"
            placeholder="이름 입력"
            value={name}
            onChange={handleNameChange}
          />
        </S.InputWrapper>
      )}

      {name && (
        <S.InputWrapper>
          <S.Label htmlFor="birth">생년월일</S.Label>
          <S.Input
            type="text"
            id="birth"
            placeholder="YYYY-MM-DD"
            value={birth}
            onChange={handleBirthChange}
          />
        </S.InputWrapper>
      )}

      <S.ButtonWrapper>
        <Button
          color="primary500"
          size="small"
          width="412px"
          disabled={!nickname || !name || !birth}
          onClick={() => setActiveBottomSheet('next')}
        >
          다음
        </Button>
      </S.ButtonWrapper>

      <BottomSheet id="next">
        <S.ModalContent>
          <S.ModalTitle>약관에 동의해주세요</S.ModalTitle>
          <S.ModalSubtitle>
            서비스를 이용하기 위해서는 동의가 필요해요.
          </S.ModalSubtitle>
          <S.AgreementWrapper>
            <S.AgreementItem>
              <S.Checkbox
                type="checkbox"
                checked={allChecked}
                onChange={handleAllCheck}
              />
              <span>네, 모두 동의합니다.</span>
            </S.AgreementItem>
            <S.AgreementItem>
              <S.Checkbox
                type="checkbox"
                checked={agreements.toss}
                onChange={() => handleAgreementChange('toss')}
              />
              <span>(필수) 서비스 이용약관</span>
              <Link to="/auth/toss">보기</Link>
            </S.AgreementItem>
            <S.AgreementItem>
              <S.Checkbox
                type="checkbox"
                checked={agreements.privacy}
                onChange={() => handleAgreementChange('privacy')}
              />
              <span>(필수) 개인정보 처리방침</span>
              <Link to="/auth/privacy">보기</Link>
            </S.AgreementItem>
            <S.AgreementItem>
              <S.Checkbox
                type="checkbox"
                checked={agreements.terms_location}
                onChange={() => handleAgreementChange('terms_location')}
              />
              <span>(필수) 위치 기반 서비스 이용약관</span>
              <Link to="/auth/terms-location">보기</Link>
            </S.AgreementItem>
          </S.AgreementWrapper>
          <S.CompleteButton disabled={!allChecked} onClick={handleRegister}>
            가입 완료
          </S.CompleteButton>
        </S.ModalContent>
      </BottomSheet>
    </S.Container>
  );
}
