import * as S from './style';
import { useState } from 'react';

const Loader = () => {
  return (
    <S.Loader
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="로더"
    >
      <S.LoaderText>임시 켁스트: 로딩중입니다</S.LoaderText>
    </S.Loader>
  );
};

const DeferredLoader = () => {
  const [isDeferred, setIsDeferred] = useState(false);

  const handleDeferred = () => {
    setTimeout(() => {
      setIsDeferred(true);
    }, 300);
  };

  if (!isDeferred) {
    handleDeferred();
    return null;
  }

  return <Loader />;
};

export default DeferredLoader;
