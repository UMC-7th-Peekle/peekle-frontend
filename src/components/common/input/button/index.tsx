import * as S from './style';
import { ButtonProps } from '@/types/common';

export const Button = ({
  color = 'none',
  size = 'medium', // 높이 결정
  width = '412px', // 너비 결정
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <S.Button
      $color={color}
      $size={size}
      $width={width}
      disabled={disabled}
      {...props}
    >
      {children}
    </S.Button>
  );
};

export default Button;

/**
 * 사용 예시
 * <Button color="primary500" size="small" width="106px" disabled={[변수]} onClick={clearFilter}>
 * </Button>
 *
 * // 비었는데 글자색 primary500 버튼
 * <Button
 *   color="primary500Line"
 *   size="small"
 *   width=""
 * >
 * </Button>
 *
 * // grya50인데 글자색 primary500 버튼
 * <Button color="gray50TextGray400" size="small" width="">
 *
 * // 카카오시작
 * <Button color="yellow" size="small" width="356px">
 * // 전화번호시작
 * <Button color="gray50" size="small" width="356px">
 */
