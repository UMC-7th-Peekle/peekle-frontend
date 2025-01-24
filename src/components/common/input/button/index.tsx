import * as S from './style';
import { ButtonProps } from '@/types/common';

export const Button = ({
  color = 'none',
  size = 'medium',
  width = '412px',
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
 * <Button color="none" size="small" width="106px" disabled={[변수]} onClick={clearFilter}>
 * </Button>
 *
 * 라인 버튼
 * <Button color="primary400" size="small" width="106px" disabled={[변수]} onClick={clearFilter}>
 * </Button>
 */
