import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { useBottomSheetStore } from '@/stores';

const Backward = ({
  size = '24px',
  isErrorFallback = false,
  navigateTo,
}: {
  size?: string;
  isErrorFallback?: boolean;
  navigateTo?: string;
}) => {
  const navigate = useNavigate();
  const { setActiveBottomSheet } = useBottomSheetStore();

  const handleBackClick = () => {
    setActiveBottomSheet(null); // 바텀시트 닫기
    if (isErrorFallback) {
      window.history.back();
    } else if (navigateTo) {
      navigate(navigateTo);
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
