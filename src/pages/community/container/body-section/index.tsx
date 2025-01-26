import EditButton from '@/components/community/edit-button';
import * as S from './style';
import { ReactNode } from 'react';

const BodySection = ({ children }: BodySectionProps) => {
  return <S.Container>{children}</S.Container>;
};

interface BodySectionProps {
  children?: ReactNode;
}

BodySection.Skeleton = () => {
  return <></>;
};

BodySection.None = () => {
  return (
    <S.NoneContainer>
      <S.SubTitle>첫 번째 게시글을{'\n'}작성해보세요!</S.SubTitle>
      <EditButton.RectType></EditButton.RectType>
    </S.NoneContainer>
  );
};

export default BodySection;
