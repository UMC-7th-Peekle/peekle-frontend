import { useAlertStore } from '@/stores';

const alert = (message: string, showWarningIcon: boolean) => {
  const store = useAlertStore.getState();
  if (store.isOpen) {
    store.close(); // 이전 alert 닫고
  }
  store.show(message, showWarningIcon); // 새 alert를 열기
};

export default alert;
