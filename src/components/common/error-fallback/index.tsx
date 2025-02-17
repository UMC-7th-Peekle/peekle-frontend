import * as S from './style';
import { useRouteError } from 'react-router-dom';
import { isNetworkError, isServerError, toast } from '@/utils';
import { Button, Backward } from '@/components';
import { AxiosError } from 'axios';

const ErrorFallback = ({ error: propsError }: { error?: Error }) => {
  const routeError = useRouteError(); // 라우터 내부에서만 동작
  const error = propsError ?? routeError;

  if (error instanceof AxiosError) {
    console.error('[에러 발생]:', error.response?.data.error.reason);
  }

  const handleRefresh = () => {
    if (isNetworkError(error as Error)) {
      toast('네트워크 연결을 확인해주세요');
      return;
    }
    window.location.reload();
  };

  const ErrorMessage = ({
    icon: Icon,
    message,
  }: {
    icon: typeof S.WifiXIcon | typeof S.WarningIcon;
    message: string;
  }) => (
    <>
      <Icon />
      <S.ErrorTextWrapper>
        <S.ErrorText>{message}</S.ErrorText>
        <S.ErrorSubText>잠시 후 다시 시도해주세요.</S.ErrorSubText>
      </S.ErrorTextWrapper>
    </>
  );

  return (
    <>
      <S.BackwardWrapper>
        <Backward size={'28px'} isErrorFallback={true} />
      </S.BackwardWrapper>
      <S.ErrorContainer role="alert" aria-live="assertive" aria-atomic="true">
        <S.ErrorInfo>
          {isNetworkError(error as Error) ? (
            <ErrorMessage
              icon={S.WifiXIcon}
              message="인터넷 연결이 불안정해요."
            />
          ) : isServerError(error as Error) ? (
            <ErrorMessage
              icon={S.WarningIcon}
              message="일시적인 오류가 발생했어요."
            />
          ) : (
            <ErrorMessage
              icon={S.WarningIcon}
              message="알 수 없는 에러가 발생했어요."
            />
          )}
        </S.ErrorInfo>
        <Button
          color="primary500"
          size="xsmall"
          width="143px"
          onClick={handleRefresh}
        >
          새로고침
        </Button>
      </S.ErrorContainer>
    </>
  );
};

export default ErrorFallback;
