import * as S from './style';
import { Portal } from '@/components';
import { useAlertStore } from '@/stores';

const Alert = () => {
  const {
    isOpen,
    message,
    showWarningIcon,
    btnText1,
    btnText2,
    onClickBtn1,
    onClickBtn2,
    close,
  } = useAlertStore();

  if (!isOpen) return null;

  const handleClickBtn1 = () => {
    onClickBtn1?.();
    close();
  };

  const handleClickBtn2 = () => {
    onClickBtn2?.();
    close();
  };

  return (
    <Portal onClose={close} type="modal">
      <S.AlertContainer>
        <S.InfoContainer>
          {showWarningIcon && <S.WarningIcon />}
          <S.AlertMessage>{message}</S.AlertMessage>
        </S.InfoContainer>
        <S.ButtonContainer>
          {btnText2 ? (
            <>
              <S.TwoBtns1 onClick={handleClickBtn1}>{btnText1}</S.TwoBtns1>
              <S.TwoBtns2 onClick={handleClickBtn2}>{btnText2}</S.TwoBtns2>
            </>
          ) : (
            <S.OneBtn onClick={handleClickBtn1}>{btnText1}</S.OneBtn>
          )}
        </S.ButtonContainer>
      </S.AlertContainer>
    </Portal>
  );
};

export default Alert;

/** 사용법
 * import { alert } from '@/utils';
 *
 * alert(
      '링크가 복사되었습니다.', //메시지
      false, //warningIcon 넣을건지
      '취소', // 왼쪽 버튼 텍스트 (gray200)
      '확인', // 오른쪽 버튼 텍스트 (primary500)
      () => {
        console.log('btn1클릭'); // 왼쪽 버튼 클릭시 핸들러 - 안 넣으면 클릭시 닫히기만 함
      },
      () => {
        console.log('btn2클릭'); // 오른쪽 버튼 클릭시 핸들러 - 안 넣으면 클릭시 닫히기만 함
      },
    );

    alert('두 글자 이상 입력해주세요.', true, '확인'); // 오른쪽 버튼 텍스트 안 넣으면 primary500으로 버튼 하나만 뜸 
 */
