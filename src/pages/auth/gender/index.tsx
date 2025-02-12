import { useState } from 'react';
import { FixedBackward } from '@/components';
import ManDefaultSVG from '@/assets/images/auth/man-default.svg?react';
import WomanDefaultSVG from '@/assets/images/auth/woman-default.svg?react';
import ManFocusSVG from '@/assets/images/auth/man-focus.svg?react';
import WomanFocusSVG from '@/assets/images/auth/woman-focus.svg?react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import { ROUTES } from '@/constants/routes';

export default function GenderSelectionPage() {
  const navigate = useNavigate();
  const [gender, setSelectedGender] = useState<string | null>('');

  const isGender = Boolean(gender !== '');

  const handleSelectGender = (gender: string) => {
    setSelectedGender(gender);
  };
  const handleNext = () => {
    const genderEnum = gender === '남성' ? 'male' : 'female';
    localStorage.setItem('gender', genderEnum || '');
    navigate(ROUTES.AUTH_PERSONAL_DATA);
  };

  return (
    <>
      <S.Container>
        <FixedBackward />
        <S.Title>성별을 선택해주세요</S.Title>
        <S.Subtitle>
          더 나은 서비스 제공과 통계 분석에 활용될 수 있어요.
        </S.Subtitle>
        <S.GenderOptions>
          {gender === '남성' ? (
            <ManFocusSVG />
          ) : (
            <ManDefaultSVG onClick={() => handleSelectGender('남성')} />
          )}

          {gender === '여성' ? (
            <WomanFocusSVG />
          ) : (
            <WomanDefaultSVG onClick={() => handleSelectGender('여성')} />
          )}
        </S.GenderOptions>
        <S.Button $isGender={isGender} onClick={handleNext}>
          다음
        </S.Button>
      </S.Container>
    </>
  );
}
