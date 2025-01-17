import * as S from './ModalPortal.styles';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalPortalProps } from '@/types/common';

const ModalPortal = ({ children, onClose }: ModalPortalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current === e.target) {
        onClose?.();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, handleClickOutside]);

  const modalRoot = document.getElementById('modal') as HTMLElement;

  return createPortal(
    <S.Overlay ref={modalRef}>{children}</S.Overlay>,
    modalRoot,
  );
};

export default ModalPortal;
