import * as S from './style';
import { useNavigate } from 'react-router-dom';

const Backward = ({
  size = '24px',
  isErrorFallback = false,
}: {
  size?: string;
  isErrorFallback?: boolean;
}) => {
  const navigate = useNavigate();

  const handleBackClick = () =>
    isErrorFallback ? window.history.back() : navigate(-1);

  return <S.BackIcon $size={size} onClick={handleBackClick} />;
};
export default Backward;

/** 사용 예시
 * <Backward> // 기본은 24px
 * <Backward size={'28px'}> // 사이즈 지정
 */
