import { create } from 'zustand';
import { AlertStore } from '@/types/common';

const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  message: '',
  showWarningIcon: false,
  btnText1: '',
  btnText2: undefined,
  onClickBtn1: undefined,
  onClickBtn2: undefined,
  show: ({
    message,
    showWarningIcon,
    btnText1,
    btnText2,
    onClickBtn1,
    onClickBtn2,
  }) => {
    set({
      isOpen: true,
      message,
      showWarningIcon,
      btnText1,
      btnText2,
      onClickBtn1,
      onClickBtn2,
    });
  },
  close: () =>
    set({
      isOpen: false,
      message: '',
      btnText1: '',
      btnText2: undefined,
      onClickBtn1: undefined,
      onClickBtn2: undefined,
    }),
}));

export default useAlertStore;
