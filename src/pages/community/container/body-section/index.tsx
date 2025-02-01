import EditButton from '@/components/community/edit-button';
import * as S from './style';
import { ReactNode } from 'react';
import { CommunityCardSkeleton } from '@/components/community/community-card';

const BodySection = ({ children }: BodySectionProps) => {
  return <S.Container>{children}</S.Container>;
};

interface BodySectionProps {
  children?: ReactNode;
}

BodySection.Skeleton = () => {
  return (
    <S.Container>
      {Array.from(Array(10).keys()).map((_, i) => (
        <CommunityCardSkeleton key={'CommunityCardSkeleton' + i} />
      ))}
    </S.Container>
  );
};

BodySection.None = ({ subTitle }: BodySectionNoneProps) => {
  return (
    <S.NoneContainer>
      <S.SubTitle>{subTitle}</S.SubTitle>
      <EditButton.RectType></EditButton.RectType>
    </S.NoneContainer>
  );
};

interface BodySectionNoneProps {
  subTitle: string;
}

export default BodySection;
