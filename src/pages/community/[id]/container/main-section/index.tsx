import { CommunityDetailArticle } from '@/pages/community/hooks/query/useGetCommunityDetail';
import * as S from './style';
import { CommentCountCard, LikeCard } from '@/components';

interface MainSectionProps {
  article: CommunityDetailArticle;
}

export default function MainSection({ article }: MainSectionProps) {
  return (
    <S.MainContainer>
      <S.Profile>
        <S.ProfileImage image={'/image/peekle-profile.webp'} />
        <S.ProfileTextContainer>
          <S.ProfileName>{article.isAnonymous ? '익명' : '피클'}</S.ProfileName>
          <S.ProfileDate>{article.createdAt}</S.ProfileDate>
        </S.ProfileTextContainer>
      </S.Profile>
      <S.Title>{article.title}</S.Title>
      <S.Content>{article.content}</S.Content>
      <S.CountWrapper>
        <LikeCard isLiked={false} count={0} />
        <CommentCountCard count={0} />
      </S.CountWrapper>
    </S.MainContainer>
  );
}
