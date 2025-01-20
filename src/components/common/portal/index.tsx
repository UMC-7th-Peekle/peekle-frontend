import * as S from './style';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PortalProps } from '@/types/common';

const Portal = ({ children, onClose, type }: PortalProps) => {
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

  const modalRoot = document.getElementById(type) as HTMLElement;

  return createPortal(
    <S.Overlay ref={modalRef}>{children}</S.Overlay>,
    modalRoot,
  );
};

export default Portal;
