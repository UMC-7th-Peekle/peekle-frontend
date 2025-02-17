import * as S from './style';
import { useNavigate } from 'react-router-dom';

const Backward = ({
  size = '24px',
  isErrorFallback = false,
  navigateUrl,
}: {
  size?: string;
  isErrorFallback?: boolean;
  navigateUrl?: string;
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (isErrorFallback) {
      window.history.back();
      return;
    }

    if (navigateUrl) {
      navigate(navigateUrl);
    } else {
      navigate(-1);
    }
  };

  return <S.BackIcon $size={size} onClick={handleBackClick} />;
};

export default Backward;

/** 사용 예시
 * <Backward> // 기본은 24px
 * <Backward size={'28px'}> // 사이즈 지정
 */
