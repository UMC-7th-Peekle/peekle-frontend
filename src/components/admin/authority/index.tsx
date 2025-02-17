import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components';

const Authority = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <Button
        color="primary500"
        size="medium"
        width="300px"
        onClick={() => navigate(ROUTES.CREATE_ROLE)}
      >
        role 생성
      </Button>
      <Button
        color="primary500"
        size="medium"
        width="300px"
        onClick={() => navigate(ROUTES.AUTHORIZE_ROLE)}
      >
        role 부여
      </Button>
      <Button
        color="primary500"
        size="medium"
        width="300px"
        onClick={() => navigate(ROUTES.UNAUTHORIZE_ROLE)}
      >
        role 삭제
      </Button>
    </S.Container>
  );
};

export default Authority;
