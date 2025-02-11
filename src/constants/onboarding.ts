const slides = [
  {
    src: '/onboarding/onboard_1.png',
    alt: 'Onboarding 1',
    text: '인생 2막의 시작\n시니어 정보 플랫폼 피클',
  },
  {
    src: '/onboarding/onboard_2.png',
    alt: 'Onboarding 2',
    text: '강좌부터 취미활동까지\n쉽게 찾아보세요',
  },
  {
    src: '/onboarding/onboard_3.png',
    alt: 'Onboarding 3',
    text: '일상과 고민을 나누며\n사람들과 함께해요',
  },
];

const KAKAO_LOGIN = `${import.meta.env.VITE_API_URL}/auth/login/kakao`;

export { slides, KAKAO_LOGIN };
