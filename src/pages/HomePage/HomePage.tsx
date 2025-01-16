import * as S from './HomePage.styles';
import PencilRoundedSVG from '@/assets/images/icons/pencil-rounded.svg?react';
import DefaultProfileSVG from '@/assets/images/profile/default-profile.svg?react';

export const HomePage = () => {
  return (
    <>
      <S.SearchIcon />
      <PencilRoundedSVG />
      <DefaultProfileSVG />
    </>
  );
};
