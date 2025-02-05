import { AnonymousCheck, Backward } from '@/components';
import * as S from './style';
import { useState } from 'react';

export default function CommunityEditPage() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <S.MainContainer>
      <S.Appbar>
        <Backward />
        <S.Title>글쓰기</S.Title>
        <S.SubmitButton>완료</S.SubmitButton>
      </S.Appbar>
      <S.TitleField
        type="text"
        autoFocus={true}
        placeholder="제목을 입력해주세요."
      />
      <S.ContentContainer>
        <S.ContentField placeholder="자유롭게 내용을 입력해주세요." />
      </S.ContentContainer>
      <S.BottomBar>
        <S.CameraButton />
        <AnonymousCheck isChecked={isChecked} onToggle={handleToggle} />
      </S.BottomBar>
    </S.MainContainer>
  );
}
