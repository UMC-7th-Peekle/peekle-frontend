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
export interface TabStore {
  // 전역
  activeTab: string; // 어떤 탭 활성화 할건지
  setActiveTab: (tab: string) => void;
}

export interface TabsContextType {
  // Tabs 내부
  selectedValue: string; // 내부 식별자
  setSelectedValue: (value: string) => void;
  option: string; // tab 종류 - 접근성용 e.g.이벤트 필터 탭
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
  activeTab: string; // BottomSheet에서 쓰이는 탭 (어떤 탭 활성화 할건지)
  setIsBottomSheetOpen: (issBottomSheetOpen: boolean) => void;
  setActiveTab: (tab: string) => void;
}

// Chip
export interface ChipProps {
  label: string; // 내부 식별자 값
  value: string; // UI에 표시할 값
  selectedValue: string; // 현재 선택된 값
  onSelect: (value: string) => void; // 선택 시 호출되는 함수
}

// Select
export type SelectOption =
  | 'sort'
  | 'category'
  | 'duration'
  | 'price'
  | 'location';

export interface SelectProps {
  option: SelectOption; // select 종류 === 쿼리 파람 키
  defaultValue: string; // 기본값
  defaultLabel: string; // 기본 라벨
}
