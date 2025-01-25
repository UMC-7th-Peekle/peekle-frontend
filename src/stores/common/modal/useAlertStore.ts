import { create } from 'zustand';
import { AlertStore } from '@/types/common';

const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  message: '',
  iconType: 'none',
  btnText1: '',
  btnText2: undefined,
  onClickBtn1: undefined,
  onClickBtn2: undefined,
  show: ({
    message,
    iconType,
    btnText1,
    btnText2,
    onClickBtn1,
    onClickBtn2,
  }) => {
    set({
      isOpen: true,
      message,
      iconType,
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
      iconType: 'none',
      btnText1: '',
      btnText2: undefined,
      onClickBtn1: undefined,
      onClickBtn2: undefined,
    }),
}));

export default useAlertStore;
