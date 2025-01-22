// FilterChips
// Dropdown
export const SORT_OPTIONS = [
  { label: '가까운 날짜순', value: 'latest' }, // 기본값
  { label: '낮은 금액순', value: 'lowest_price' },
  { label: '가까운 거리순', value: 'shortest_distance' },
];

// FilterChip
export const CATEGORY_OPTIONS = [
  ['전체', 'all'],
  ['교육', 'education'],
  ['문화', 'culture'],
  ['활동', 'activity'],
];

export const PRICE_OPTIONS = [
  ['전체', 'all'],
  ['무료', 'free'],
  ['유료', 'paid'],
];

export const LOCATION_OPTIONS = [
  ['전체', 'all'],
  ['강남 / 서초 / 양재', 'gangnam'], // 고유 키 필요
  ['잠실 / 송파 / 강동', 'jamsil'],
  ['동작 / 관악 / 사당', 'dongjak'],
  ['마포 / 서대문 / 은평', 'mapo'],
  ['종로 / 중구 / 용산', 'jongno'],
  ['강서 / 금천 / 양천', 'gangseo'],
  ['영등포 / 구로 / 신도림', 'yeongdeungpo'],
  ['광진 / 성동 / 중랑 / 동대문', 'gwangjin'],
];

export const FILTER_KEYS = [
  'sort',
  'category',
  'duration',
  'price',
  'location',
];

// BottomSheet
export const BOTTOM_SHEET_ID_EVENT_FILTER = 'event-filter';
export const BOTTOM_SHEET_ID_EVENT_INFO = 'event-info'; // map에서 사용
export const BOTTOM_SHEET_ID_EVENT_SHARE = 'event-share';

// Duration에서 쓰는 Chip
export const DURATION_OPTIONS = [
  ['전체', 'all'],
  ['오늘', 'today'],
  ['1주', 'one_week'],
  ['1개월', 'one_month'],
  ['3개월', 'three_month'],
];

export const PREDEFINED_RANGES = {
  today: [new Date(), new Date()], // 오늘이 기준
  one_week: [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 7)),
  ],
  one_month: [
    new Date(),
    new Date(new Date().setMonth(new Date().getMonth() + 1)),
  ],
  three_month: [
    new Date(),
    new Date(new Date().setMonth(new Date().getMonth() + 3)),
  ],
};

// Marker
export const MAP_MARKERS = {
  my_location: `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="18" fill="#1855DA" opacity=".3"/>
      <circle cx="18" cy="18" r="7.5" fill="#1855DA" stroke="#fff" stroke-width="3"/>
    </svg>`,
  activity: `
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="none" viewBox="0 0 44 44">
      <g filter="url(#a)">
        <rect width="36" height="36" x="4" fill="#4AA662" rx="18"/>
        <rect width="33" height="33" x="5.5" y="1.5" stroke="#fff" stroke-width="3" rx="16.5"/>
        <path fill="#fff" d="m21.55 22.62 5.547-5.546a7.725 7.725 0 0 1-2.495-1.676 7.723 7.723 0 0 1-1.676-2.495L17.38 18.45c-.433.433-.65.65-.835.888a4.95 4.95 0 0 0-.562.908c-.13.273-.226.564-.42 1.145l-1.021 3.062a.795.795 0 0 0 1.006 1.006l3.062-1.021c.581-.194.872-.29 1.145-.42.323-.154.626-.341.908-.562.239-.186.455-.402.888-.835Zm7.086-7.085a2.95 2.95 0 1 0-4.17-4.171l-.666.665.028.084c.328.938.865 1.789 1.57 2.49A6.564 6.564 0 0 0 27.97 16.2l.665-.665Z"/>
      </g>
      <defs>
        <filter id="a" width="44" height="44" x="0" y="0" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_643_14066"/>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_643_14066" result="shape"/>
        </filter>
      </defs>
    </svg>`,
  culture: `
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="none" viewBox="0 0 44 44">
      <g filter="url(#a)">
        <rect width="36" height="36" x="4" fill="#4AA662" rx="18"/>
        <rect width="33" height="33" x="5.5" y="1.5" stroke="#fff" stroke-width="3" rx="16.5"/>
        <path fill="#fff" d="M26.583 18a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm-2.5-3.333a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm-4.166 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM17.417 18a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM22 10.5a7.5 7.5 0 0 0 0 15 1.25 1.25 0 0 0 1.25-1.25c0-.325-.125-.617-.325-.833a1.25 1.25 0 0 1 .933-2.083h1.475a4.167 4.167 0 0 0 4.167-4.167c0-3.684-3.358-6.667-7.5-6.667Z"/>
      </g>
      <defs>
        <filter id="a" width="44" height="44" x="0" y="0" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_643_14116"/>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_643_14116" result="shape"/>
        </filter>
      </defs>
    </svg>`,
  education: `
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="none" viewBox="0 0 44 44">
      <g filter="url(#a)">
        <rect width="36" height="36" x="4" fill="#4AA662" rx="18"/>
        <rect width="33" height="33" x="5.5" y="1.5" stroke="#fff" stroke-width="3" rx="16.5"/>
        <path fill="#fff" fill-rule="evenodd" d="M17.5 24.73v-4.958l9.179-3.06.039-.013c.235-.078.478-.159.658-.247.127-.061.624-.308.624-.886 0-.578-.497-.824-.624-.886-.18-.087-.423-.168-.658-.246l-.039-.013-9.089-3.03-.026-.01a2.966 2.966 0 0 0-.401-.112.975.975 0 0 0-.756.156.976.976 0 0 0-.387.668c-.02.137-.02.298-.02.417v12.219a.75.75 0 0 0 1.5 0Z" clip-rule="evenodd"/>
      </g>
      <defs>
        <filter id="a" width="44" height="44" x="0" y="0" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_643_14077"/>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_643_14077" result="shape"/>
        </filter>
      </defs>
    </svg>`,
};
