// Portal
export interface PortalProps {
  children: React.ReactNode;
  onClose?: () => void;
  type: 'modal' | 'other-portal'; //index.html의 id
  isDropdown?: boolean;
}

// modal
export interface AlertStore {
  isOpen: boolean;
  message: string;
  show: (message: string) => void;
  close: () => void;
}

export interface ConfirmStore {
  isOpen: boolean;
  content: React.ReactNode;
  show: (content: React.ReactNode) => void;
  close: () => void;
}

// BottomSheet
export interface BottomSheetStore {
  activeBottomSheet: string | null; // 현재 활성화된 BottomSheet (없으면 null)
  setActiveBottomSheet: (sheet: string | null) => void; // 활성화된 BottomSheet 설정
  bottomSheetHeight: number | 'auto'; // BottomSheet 높이
  setBottomSheetHeight: (height: number | 'auto') => void; // BottomSheet 높이 설정
}

export interface BottomSheetProps {
  id: string;
  children: React.ReactNode;
}

// Chip
export interface ChipProps {
  label: string; // 내부 식별자 값
  value: string; // UI에 표시할 값
  selectedValue: string; // 현재 선택된 값
  onSelect: (value: string) => void; // 선택 시 호출되는 함수
}

// Dropdown
export interface DropdownItem {
  label: string; // UI에 표시될 이름
  value: string; // 고유 값
}

export interface DropdownProps {
  list: DropdownItem[];
  onClick?: () => void;
  onSelect?: (value: string) => void; // 항목 클릭 시 실행할 함수
  width?: string;
}

// ToggleHeart
export interface ToggleHeartProps {
  size: number;
  borderColor: string;
  isActive: boolean;
  onClick: () => void;
}

export interface HeartSVGProps extends React.SVGAttributes<SVGElement> {
  $size?: number;
  $borderColor?: string;
}
