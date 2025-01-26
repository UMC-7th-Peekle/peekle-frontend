import { useConfirmStore } from '@/stores';
import { ReactNode } from 'react';

const confirm = (content: ReactNode) => {
  const store = useConfirmStore.getState();
  if (store.isOpen) {
    store.close(); // 이전 confirm 닫고
  }
  store.show(content); // 새 confirm을 열기
};

export default confirm;
