import * as S from './style';
import { useState } from 'react';

const Loader = ({ text = '' }: { text?: string }) => {
  return (
    <S.Loader
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="로더"
    >
      <S.LoaderTextWrapper>
        <S.LoaderText>임시 텍스트: 로딩중입니다</S.LoaderText>
        {text.length > 0 && <S.LoaderText>{text}</S.LoaderText>}
      </S.LoaderTextWrapper>
    </S.Loader>
  );
};

const DeferredLoader = ({ text = '' }: { text?: string }) => {
  const [isDeferred, setIsDeferred] = useState(false);

  // console.log('isDeferred', isDeferred);

  const handleDeferred = () => {
    setTimeout(() => {
      setIsDeferred(true);
    }, 300);
  };

  if (!isDeferred) {
    handleDeferred();
    return null;
  }

  return <Loader text={text} />;
};

export default DeferredLoader;
