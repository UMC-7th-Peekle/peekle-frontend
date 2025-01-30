import { ReactNode } from 'react';
import * as S from './style';
import Heart from '@/assets/images/icons/heart-filled.svg?react';
import { CommunityCardSkeleton } from '@/components/community/community-card';

export default function BodySection({ children }: BodySectionProps) {
  return <S.Container>{children}</S.Container>;
}

interface BodySectionProps {
  children?: ReactNode;
}

BodySection.None = () => {
  return (
    <S.NoneContainer>
      <S.PeekleLikeImage />
      <S.Text>
        게시글에 <Heart />를 눌러보세요
      </S.Text>
    </S.NoneContainer>
  );
};

BodySection.Skeleton = () => {
  return (
    <S.Container>
      {Array.from(Array(10).keys()).map((_, i) => (
        <CommunityCardSkeleton key={'CommunityCardSkeleton' + i} />
      ))}
    </S.Container>
  );
};
