import * as S from './style';
import { RoundedButtonProps, RoundedBtnIcon } from '@/types/common';

const RoundedButton = ({ icon, text, ...props }: RoundedButtonProps) => {
  const iconMap: Record<RoundedBtnIcon, React.ReactNode> = {
    menu: <S.MenuIcon />,
    map: <S.MapIcon />,
    plus: <S.PlusIcon />,
  };
  return (
    <S.RoundedButton {...props}>
      {iconMap[icon as RoundedBtnIcon]}
      <S.Text>{text}</S.Text>
    </S.RoundedButton>
  );
};

export default RoundedButton;

/** 사용 예시
 * <RoundedButton
    icon="menu"
    text="목록 보기"
    onClick={handleGotoListBtnClick}
  />
 */
