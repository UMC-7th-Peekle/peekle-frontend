import * as S from './style';
import { ToggleHeartProps } from '@/types/common';

const ToggleHeart = (props: ToggleHeartProps) => {
  return (
    <S.HeartWrapper onClick={props.onClick}>
      {props.isActive ? <S.HeartFilledIcon /> : <S.HeartIcon />}
    </S.HeartWrapper>
  );
};

export default ToggleHeart;

/** 사용 예시
 * import { ToggleHeart } from '@/components';
 * <ToggleHeart size={28} borderColor={theme.color.gray[600]} isActive={true} />
 */
