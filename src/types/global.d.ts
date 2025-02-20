declare global {
  interface Window {
    navermap_authFailure: () => void;
    Kakao: Kakao;
  }
}

export {};
