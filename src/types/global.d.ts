export {};

declare global {
  interface Window {
    navermap_authFailure: () => void;
  }
}
