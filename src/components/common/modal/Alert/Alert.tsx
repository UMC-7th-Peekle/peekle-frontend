import * as S from './Alert.styles';
import ModalPortal from '../ModalPortal/ModalPortal';
import { useAlertStore } from '@/stores/common/modal/useAlertStore';

const Alert = () => {
  const { isOpen, message, close } = useAlertStore();

  if (!isOpen) return null;

  return (
    <ModalPortal onClose={close}>
      <S.AlertContainer>
        <S.WarningIcon />
        <S.AlertMessage>{message}</S.AlertMessage>
        <S.CheckedBtn onClick={close}>확인</S.CheckedBtn>
      </S.AlertContainer>
    </ModalPortal>
  );
};

export default Alert;

/** 사용법
 * import { alert } from '@/stores/common/modal/useAlertStore';
 *
 * alert('두 글자 이상 입력해주세요.')
 */
