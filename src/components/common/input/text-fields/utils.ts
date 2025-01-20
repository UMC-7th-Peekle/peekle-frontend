// Debounce 처리 유틸리티
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
