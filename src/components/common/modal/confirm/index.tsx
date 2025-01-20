import * as S from './style';
import { Portal } from '@/components';
import { useConfirmStore } from '@/stores';

const Confirm = () => {
  const { isOpen, content, close } = useConfirmStore();

  if (!isOpen) return null;

  return (
    <Portal onClose={close} type="modal">
      <S.ConfirmContainer>{content}</S.ConfirmContainer>
    </Portal>
  );
};

export default Confirm;

/** 사용 예시
 * import { useConfirmStore, confirm } from '@/stores/common/modal/useConfirmStore';
 *
 * const { close } = useConfirmStore(); // 모달 닫는 함수
 *
 * const handleOpenConfirm = () => {
 *    confirm( // 모달 내용을 넣어 주세요
 *      <>
 *        <p>허용하시겠습니까?</p>
 *        <BtnContainer>
 *          <AllowBtn onClick={() => console.log('허용')}>허용</AllowBtn>
 *          <NotAllowBtn onClick={handleNotAllowBtn}>허용 안 함</NotAllowBtn>
 *        </BtnContainer>
 *      </>,
 *    );
 *  };
 *
 * const handleNotAllowBtn = () => {
 *    // ...
 *    close(); // 모달 닫기
 *  };
 *
 * confirm (
 *  <S.ModalContainer>
 *    <S.ModalTitle>허용하시겠습니까?</S.ModalTitle>
 *    <S.BtnContainer>
 *      <S.AllowBtn onClick={handleAllowBtn}>허용</S.AllowBtn>
 *      <S.NotAllowBtn onClick={handleNotAllowBtn}>허용 안 함</S.NotAllowBtn>
 *    </S.BtnContainer>
 *  </S.ModalContainer>
 * )
 *
 * return (
 *   <>
 *     <button onClick={handleOpenConfirm}>confirm 열기</button>
 *   </>
 * )
 */
