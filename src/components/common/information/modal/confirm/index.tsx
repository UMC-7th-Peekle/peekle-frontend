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
 * import { useConfirmStore } from '@/stores';
 * import { confirm } from '@/utils';
 *
 * const { close } = useConfirmStore(); // 모달 닫는 함수
 *
 * const handleOpenConfirm = () => {
 *    confirm( // 모달 내용을 넣어 주세요 - 크기는 이 컴텐츠로 커스텀해주세요!
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
 *
 * return (
 *   <>
 *     <button onClick={handleOpenConfirm}>confirm 열기</button>
 *   </>
 * )
 */
