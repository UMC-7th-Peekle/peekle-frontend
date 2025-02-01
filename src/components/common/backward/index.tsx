import * as S from './style';
import { useNavigate } from 'react-router-dom';

const Backward = ({
  size = '24px',
  page = '',
  isErrorFallback = false,
}: {
  size?: string;
  page?: 'eventDetail' | ''; // 공유되는 사이트는 백버튼 경로 지정해주기
  isErrorFallback?: boolean;
}) => {
  const navigate = useNavigate();

  const handleBackClick = () =>
    isErrorFallback
      ? window.history.back()
      : page === 'eventDetail'
        ? navigate('/event')
        : navigate(-1);

  return <S.BackIcon $size={size} onClick={handleBackClick} />;
};
export default Backward;

/** 사용 예시
 * <Backward> // 기본은 24px
 * <Backward size={'28px'}> // 사이즈 지정
 */
