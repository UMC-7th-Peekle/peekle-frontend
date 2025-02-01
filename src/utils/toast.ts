import { useToastStore } from '@/stores';

const toast = (message: string) => {
  const store = useToastStore.getState();
  if (store.isOpen) {
    store.close(); // 이전 toast 닫고
  }
  setTimeout(() => {
    store.show(message); // 새 toast 열기
  }, 0);
};

export default toast;
