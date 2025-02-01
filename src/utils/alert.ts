import { useAlertStore } from '@/stores';
import { AlertIconType } from '@/types/common';

const alert = (
  message: string,
  iconType: AlertIconType,
  btnText1: string,
  btnText2?: string,
  onClickBtn1?: () => void,
  onClickBtn2?: () => void,
) => {
  const store = useAlertStore.getState();
  if (store.isOpen) {
    store.close(); // 이전 alert 닫고
  }
  setTimeout(() => {
    store.show({
      message,
      iconType,
      btnText1,
      btnText2,
      onClickBtn1,
      onClickBtn2,
    }); // 새 alert를 열기
  }, 0);
};

export default alert;
