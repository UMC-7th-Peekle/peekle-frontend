import { useRouteError } from 'react-router-dom';

const ErrorFallback = ({ error: propsError }: { error?: Error }) => {
  const routeError = useRouteError();
  const error = propsError ?? routeError;

  return (
    <p>
      에러 페이지 {error instanceof Error ? error.message : '알 수 없는 에러'}
    </p>
  );
};

export default ErrorFallback;
