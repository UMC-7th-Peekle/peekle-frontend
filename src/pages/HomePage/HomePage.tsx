import * as S from './HomePage.styles';
import PencilRoundedSVG from '@/assets/images/pencil-rounded.svg?react';

export const HomePage = () => {
  return (
    <>
      <S.SearchIcon />
      <PencilRoundedSVG />
      <S.Wrapper>
        <h1>Pretendard Black (900)</h1>
        <h2>Pretendard ExtraBold (800)</h2>
        <h3>Pretendard Bold (700)</h3>
        <p>Pretendard Regular (400)</p>
        <span>Pretendard Light (300)</span>
        <p className="extra-light">Pretendard ExtraLight (200)</p>
        <p className="thin">Pretendard Thin (100)</p>
      </S.Wrapper>
    </>
  );
};
