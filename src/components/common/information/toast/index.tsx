import * as S from './style';
import { useToastStore } from '@/stores';

const Toast = () => {
  const { isOpen, message } = useToastStore();

  if (!isOpen) return null;

  return <S.Toast>{message}</S.Toast>;
};

export default Toast;

/** 사용법
 * import { toast } from '@/utils';
 *
 * toast('두 글자 이상 입력해주세요.')
 */
