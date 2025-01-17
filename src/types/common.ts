import { ReactNode } from 'react';

// modal
export interface ModalPortalProps {
  children: ReactNode;
  onClose?: () => void;
}

export interface AlertStore {
  isOpen: boolean;
  message: string;
  show: (message: string) => void;
  close: () => void;
}

export interface ConfirmStore {
  isOpen: boolean;
  content: React.ReactNode;
  show: (content: ReactNode) => void;
  close: () => void;
}
