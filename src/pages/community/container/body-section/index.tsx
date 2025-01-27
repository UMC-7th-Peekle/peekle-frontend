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
    <BodySection>
      {Array.from({ length: 5 }, (_, index) => (
        <CommunityCardSkeleton key={`skeleton-${index}`} />
      ))}
    </BodySection>
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
