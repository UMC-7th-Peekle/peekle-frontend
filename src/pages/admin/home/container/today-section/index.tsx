import * as S from './style';

// 관리자 홈 페이지 하단 공지 컨테이너

export default function NoticeSection() {
  return (
    <S.MainContainer>
      <S.TitleContainer>
        <S.Title>오늘의 할일</S.Title>
        <S.CountBox>8</S.CountBox>
      </S.TitleContainer>
      <S.OutRowContainer>
        <S.RowContainer>
          <S.TodoBox>미해결</S.TodoBox>
          <S.CountText>3</S.CountText>
        </S.RowContainer>
        <S.RowContainer>
          <S.TodoBoxRedTheme>검토필요</S.TodoBoxRedTheme>
          <S.CountText>5</S.CountText>
        </S.RowContainer>
      </S.OutRowContainer>
    </S.MainContainer>
  );
}
