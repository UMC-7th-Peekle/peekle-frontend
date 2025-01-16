import { useState } from 'react';

const Loader = () => {
  return <p>로딩</p>;
};

const DeferredLoader = () => {
  const [isDeferred, setIsDeferred] = useState(false);

  const handleDeferred = () => {
    setTimeout(() => {
      setIsDeferred(true);
    }, 200);
  };

  if (!isDeferred) {
    handleDeferred();
    return null;
  }

  return <Loader />;
};

export default DeferredLoader;
