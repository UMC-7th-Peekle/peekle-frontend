interface KakaoShareLink {
  mobileWebUrl: string;
  webUrl: string;
}

interface KakaoButton {
  title: string;
  link: KakaoShareLink;
}

interface KakaoContent {
  title: string;
  description: string;
  imageUrl: string;
  link: KakaoShareLink;
}

interface KakaoShare {
  sendDefault: (params: {
    objectType: 'feed';
    content: KakaoContent;
    buttons: KakaoButton[];
    installTalk: boolean;
  }) => void;
}

interface Kakao {
  isInitialized: () => boolean;
  init: (clientSecret: string) => void;
  Share: KakaoShare;
}
