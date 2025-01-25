import * as S from './style';
import { Portal } from '@/components';
import { useAlertStore } from '@/stores';

const Alert = () => {
  const {
    isOpen,
    message,
    iconType,
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
          {iconType === 'warning' ? (
            <S.WarningIcon />
          ) : (
            iconType === 'camera' && <S.CameraIcon />
          )}
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
    '피클에서 기기의\n사진과 동영상에 엑세스하도록\n허용하시겠습니까?',
    'camera', // 아이콘 종류 'camera' | 'warning' | 'none'
    '허용안함', // 왼쪽 버튼 텍스트 (gray200)
    '허용', // 오른쪽 버튼 텍스트 (primary500)
    () => {console.log('btn1 클릭')}, // 왼쪽 버튼 클릭 핸들러 - 생략시 close만 됨
    () => {console.log('btn1 클릭')}, // 오른쪽 버튼 클릭 핸들러 - 생략시 close만 됨
  );

    alert('두 글자 이상 입력해주세요.', 'none', '확인'); // 오른쪽 버튼 텍스트 안 넣으면 primary500으로 버튼 하나만 뜸 
 */
