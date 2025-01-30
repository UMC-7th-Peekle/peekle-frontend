import * as S from './style';
import { Backward } from '@/components';

const NotFoundPage = () => {
  return (
    <>
      <S.BackwardWrapper>
        <Backward />
      </S.BackwardWrapper>
      <S.Container role="alert" aria-live="assertive" aria-atomic="true">
        임시 텍스트-유효하지 않은 경로입니다.
      </S.Container>
    </>
  );
};

export default NotFoundPage;
