import { useAlertStore } from '@/stores';

const alert = (
  message: string,
  showWarningIcon: boolean,
  btnText1: string,
  btnText2?: string,
  onClickBtn1?: () => void,
  onClickBtn2?: () => void,
) => {
  const store = useAlertStore.getState();
  if (store.isOpen) {
    store.close(); // 이전 alert 닫고
  }
  store.show({
    message,
    showWarningIcon,
    btnText1,
    btnText2,
    onClickBtn1,
    onClickBtn2,
  }); // 새 alert를 열기
};

export default alert;
