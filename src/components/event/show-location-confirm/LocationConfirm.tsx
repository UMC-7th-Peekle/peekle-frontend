import * as S from './style';
import { Button } from '@/components';
import { useConfirmStore } from '@/stores';
import { LocationConfirmProps } from '@/types/event';

const LocationConfirm = ({
  onLocationAllow,
  onLocationDeny,
}: LocationConfirmProps) => {
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
        <Button
          color="primary500"
          width="284px"
          size="small"
          onClick={() => {
            onLocationAllow();
            close();
          }}
        >
          앱 사용 중에만 허용
        </Button>
        <Button
          color="none"
          width="284px"
          size="small"
          onClick={() => {
            onLocationDeny();
            close();
          }}
        >
          허용 안 함
        </Button>
      </S.BtnContainer>
    </S.LocationConfirm>
  );
};

export default LocationConfirm;
