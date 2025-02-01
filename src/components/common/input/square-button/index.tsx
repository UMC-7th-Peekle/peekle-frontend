import * as S from './style';
import { SquareButtonProps } from '@/types/common';

const SquareButton = ({ icon, ...props }: SquareButtonProps) => {
  const IconComponent = {
    myLocation: S.MyLocationSquareButton,
    filter: S.FilterSqaureButton,
  }[icon];

  return (
    <IconComponent
      role="button"
      {...(props as React.SVGProps<SVGSVGElement>)}
    />
  );
};

export default SquareButton;

/** 사용 예시
 * <SquareButton icon="myLocation" onClick={handleMyLocationClick} />
 */
