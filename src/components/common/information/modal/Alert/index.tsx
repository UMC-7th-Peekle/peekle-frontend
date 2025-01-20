import * as S from './style';
import { Portal } from '@/components';
import { useAlertStore } from '@/stores';

const Alert = () => {
  const { isOpen, message, close } = useAlertStore();

  if (!isOpen) return null;

  return (
    <Portal onClose={close} type="modal">
      <S.AlertContainer>
        <S.WarningIcon />
        <S.AlertMessage>{message}</S.AlertMessage>
        <S.CheckedBtn onClick={close}>확인</S.CheckedBtn>
      </S.AlertContainer>
    </Portal>
  );
};

export default Alert;

/** 사용법
 * import { alert } from '@/utils';
 *
 * alert('두 글자 이상 입력해주세요.')
 */
