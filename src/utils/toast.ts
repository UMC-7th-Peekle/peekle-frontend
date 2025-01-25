import { useToastStore } from '@/stores';

const toast = (message: string) => {
  const store = useToastStore.getState();
  if (store.isOpen) {
    console.log('이전 토스트 열려있음');
    store.close(); // 이전 toast 닫고
  }
  store.show(message); // 새 toast 열기
};

export default toast;
