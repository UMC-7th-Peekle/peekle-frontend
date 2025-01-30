import * as S from './style';

interface ThreeDotProps {
  size?: string;
  isErrorFallback?: boolean;
  onClick?: () => void;
}

const ThreeDot = ({ size, onClick = () => {} }: ThreeDotProps) => {
  return <S.BackIcon $size={size} onClick={onClick} />;
};
export default ThreeDot;

/** 사용 예시
 * <ThreeDot> // 기본은 24px
 * <ThreeDot size={'28px'}> // 사이즈 지정
 */
