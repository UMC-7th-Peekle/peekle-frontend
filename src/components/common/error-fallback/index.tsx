import * as S from './style';
import { useRouteError } from 'react-router-dom';
import { isNetworkError, isServerError } from '@/utils/error';
import { Button, Backward } from '@/components';

const ErrorFallback = ({ error: propsError }: { error?: Error }) => {
  const routeError = useRouteError();
  const error = propsError ?? routeError;

  return (
    <S.ErrorContainer role="alert" aria-live="assertive" aria-atomic="true">
      <Backward size={'28px'} />
      <S.ErrorText aria-label="에러 내용">
        {isNetworkError(error as Error)
          ? '인터넷 연결이 불안정해요.'
          : isServerError(error as Error)
            ? '일시적인 오류가 발생했어요.'
            : error instanceof Error
              ? error.message
              : '알 수 없는 에러가 발생했어요.'}
      </S.ErrorText>
      <S.ErrorSubText>잠시 후 다시 시도해주세요.</S.ErrorSubText>
      <Button color="primary500" size="xsmall" width="143px">
        새로고침
      </Button>
    </S.ErrorContainer>
  );
};

export default ErrorFallback;
