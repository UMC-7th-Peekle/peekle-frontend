import * as S from './style';

export default function CommunityCard({
  title,
  content,
  date,
}: CommunityCardProps) {
  return (
    <S.Container>
      <S.Title>${title}</S.Title>
      <S.Content>${content}</S.Content>
      <S.Date>${date}</S.Date>
    </S.Container>
  );
}

interface CommunityCardProps {
  title: string;
  content: string;
  date: string;
}
