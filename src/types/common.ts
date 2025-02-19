import z from 'zod';
import { ZodSchema } from 'zod';

// Portal
export interface PortalProps {
  children: React.ReactNode;
  onClose?: () => void;
  type: 'modal' | 'other-portal'; //index.html의 id
  isDropdown?: boolean;
}

// modal
export type AlertIconType = 'none' | 'warning' | 'camera' | 'logout';
export interface AlertStore {
  isOpen: boolean;
  message: string;
  iconType: AlertIconType;
  btnText1: string;
  btnText2?: string;
  onClickBtn1?: () => void;
  onClickBtn2?: () => void;
  show: (options: {
    message: string;
    iconType: AlertIconType;
    btnText1: string;
    btnText2?: string;
    onClickBtn1?: () => void;
    onClickBtn2?: () => void;
  }) => void;
  close: () => void;
}

export interface ConfirmStore {
  isOpen: boolean;
  content: React.ReactNode;
  show: (content: React.ReactNode) => void;
  close: () => void;
}

// Toast
export interface ToastStore {
  isOpen: boolean;
  isFadingOut: boolean;
  message: string;
  show: (message: string) => void;
  close: () => void;
}

// BottomSheet
export interface BottomSheetStore {
  activeBottomSheet: string | null; // 현재 활성화된 BottomSheet (없으면 null)
  setActiveBottomSheet: (sheet: string | null) => void; // 활성화된 BottomSheet 설정
  bottomSheetHeight: number | 'auto'; // BottomSheet 높이
  setBottomSheetHeight: (height: number | 'auto') => void; // BottomSheet 높이 설정
}

export interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리 Y값
    touchY: number; // touchstart에서 터치 포인트 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: 'none' | 'down' | 'up'; // 유저가 터치를 움직이고 있는 방향
  };
  isContentAreaTouched: boolean; // 컨텐츠 영역을 터치하고 있음을 기록
}

export interface BottomSheetProps {
  id: string;
  shouldShowLine?: boolean;
  children: React.ReactNode;
}

// Chip
export interface ChipProps {
  label: string; // 내부 식별자 값
  value: string; // UI에 표시할 값
  isActive: boolean; // 현재 선택됐는지
  onSelect: (value: string) => void; // 선택 시 호출되는 함수
}

// Dropdown
export interface DropdownItem {
  label: string; // UI에 표시될 이름
  value: string; // 고유 값
}

export interface DropdownProps {
  list: DropdownItem[];
  isEventPage?: boolean;
  onClick?: () => void;
  onSelect?: (value: string) => void; // 항목 클릭 시 실행할 함수
  width?: string;
}

// ToggleHeart
export interface ToggleHeartProps {
  size?: number;
  borderColor?: string;
  filledColor?: string;
  isActive: boolean;
  onClick: () => void;
}

export interface HeartSVGProps extends React.SVGAttributes<SVGElement> {
  $size?: number;
  $borderColor?: string;
  $filledColor?: string;
}

// Button
type BtnColor =
  | 'black'
  | 'primary400Line'
  | 'primary500'
  | 'primary500Line'
  | 'primary700'
  | 'gray50'
  | 'gray50TextGray400'
  | 'yellow'
  | 'none';
type BtnSize = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: BtnColor;
  size: BtnSize;
  width?: string;
}

export interface StyledButtonProps {
  $color: BtnColor;
  $size: BtnSize;
  $width?: string;
}

// SquareButton
export type SqureBtnIcon = 'myLocation' | 'filter';
export interface SquareButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: SqureBtnIcon;
}

// RoundedButton
export type RoundedBtnIcon = 'map' | 'menu' | 'plus';
export interface RoundedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: RoundedBtnIcon;
  text: string;
}

// Backward
export interface BackSVGProps {
  $size?: string;
}

// MetaTag
export interface MetaTagProps {
  title?: string;
  description?: string;
  imgSrc?: string;
  url?: string;
}

// ValidateInput
export interface BaseValidateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
  errorMessage?: string;
  validatedMessage?: string;
}

export interface ValidateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  errorMessage?: string;
  validatedMessage?: string;
}

export interface StyledValidateInputProps {
  $errorMessage?: boolean;
  $validatedMessage?: boolean;
}

// ValidateSelect
export interface ValidateSelectProps {
  id: string;
  options: { label: string; value: string | number }[];
  errorMessage?: string;
  validatedMessage?: string;
}

export interface StyledValidateSelectProps {
  $errorMessage?: boolean;
  $validatedMessage?: boolean;
}

// 전체 응답 스키마
export const ApiResponseSchema = <T>(SuccessType: ZodSchema<T>) =>
  z.object({
    resultType: z.enum(['SUCCESS', 'FAIL']),
    error: z
      .object({
        errorCode: z.string(),
        reason: z.string(),
        data: z.unknown().nullable(),
      })
      .nullable(),
    success: z.union([SuccessType, z.null()]),
  });
export type ApiResponse<T> = z.infer<ReturnType<typeof ApiResponseSchema<T>>>;
