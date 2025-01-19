import * as S from './style';
import { useConfirmStore } from '@/stores';
import { LocationConfirmProps } from '@/types/event';

const LocationConfirm = ({ onLocationAllow }: LocationConfirmProps) => {
  const { close } = useConfirmStore();

  return (
    <S.LocationConfirm>
      <S.ConfirmInfo>
        <S.LocationIcon />
        <S.ConfirmText>Peekle에서 위치 정보를 사용하려고 합니다.</S.ConfirmText>
        <S.Description>
          필터, 검색, Peekle 지도, 광고 등을 위해 회원님의 위치 정보를
          사용합니다.
        </S.Description>
      </S.ConfirmInfo>
      <S.BtnContainer>
        <S.ConfirmButton
          onClick={() => {
            sessionStorage.setItem('curr-location-agree', 'true');
            onLocationAllow();
            close();
          }}
        >
          앱 사용 중에만 허용
        </S.ConfirmButton>
        <S.NotConfirmButton
          onClick={() => {
            sessionStorage.setItem('curr-location-agree', 'false');
            close();
          }}
        >
          허용 안 함
        </S.NotConfirmButton>
      </S.BtnContainer>
    </S.LocationConfirm>
  );
};

export default LocationConfirm;
