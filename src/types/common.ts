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

// Tabs
export interface TabsContextType {
  selectedValue: string; // 내부 식별자 값
  setSelectedValue: (key: string) => void;
  option: string; // tab option - 접근성용 e.g.이벤트 필터 탭
}

export interface TabsProps {
  option: string;
  defaultValue: string;
  children: React.ReactNode;
}

export interface TabTriggerProps {
  value: string;
  label: string; // ui에 표시할 값
  onClick?: () => void;
}

export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
}

export interface TabListProps {
  children: React.ReactElement<TabTriggerProps>[];
}

// BottomSheet
export interface BottomSheetStore {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (issBottomSheetOpen: boolean) => void;
}

// Chips
export interface ChipProps {
  label: string; // 내부 식별자 값
  value: string; // UI에 표시할 값
  selectedValue: string; // 현재 선택된 값
  onSelect: (value: string) => void; // 선택 시 호출되는 함수
}
