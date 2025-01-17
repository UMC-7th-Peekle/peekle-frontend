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
  selectedKey: string;
  setSelectedKey: (key: string) => void;
  label: string;
}

export interface TabsProps {
  label: string;
  defaultValue: string;
  children: React.ReactNode;
}

export interface TabTriggerProps {
  value: string;
  text: string;
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
