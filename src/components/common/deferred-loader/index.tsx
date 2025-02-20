import * as S from './style';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 setIsDeferred 호출
    const timer = setTimeout(() => {
      setIsDeferred(true);
    }, 300);

    // 클린업 함수로 타이머 정리
    return () => clearTimeout(timer);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <Loader text={text} />;
};

export default DeferredLoader;
