import * as S from './style';
import { useEffect, useRef, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { PortalProps } from '@/types/common';

const Portal = ({
  children,
  onClose,
  type,
  isDropdown = false,
}: PortalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const useClickOutside = (
    ref: RefObject<HTMLDivElement | null>,
    onClose: (() => void) | undefined,
  ) => {
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && ref.current === e.target) {
          onClose?.();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, onClose]);
  };

  // 외부 클릭 부분은 모달이 아닐때만 가능하게
  useClickOutside(modalRef, type === 'other-portal' ? onClose : undefined);

  const modalRoot = document.getElementById(type) as HTMLElement;

  return createPortal(
    <S.Overlay ref={modalRef} $isDropdown={isDropdown}>
      {children}
    </S.Overlay>,
    modalRoot,
  );
};

export default Portal;
