import * as S from './style';
import { useEffect, useCallback, useState } from 'react';
import { useQueryState } from 'nuqs';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  EventCard,
  LocationConfirm,
  SquareButton,
  RoundedButton,
} from '@/components';
import { useBottomSheetStore, useMyLocationStore, useMapStore } from '@/stores';
import { confirm, getMarker, getCurrentPosition } from '@/utils';
import { BOTTOM_SHEET_ID_EVENT_INFO } from '@/constants/event';
import { ROUTES } from '@/constants/routes';
import { useEventFilter } from '@/hooks';
import { EventData } from '@/types/event';
import { theme } from '@/styles/theme';

window.navermap_authFailure = function () {
  console.error('네이버 지도 인증 실패');
  // throw new Error('네이버 지도 인증 실패'); // ErrorFallback 개발 후 에러 바운더리로 던지기
};

let mapInstance: naver.maps.Map | null = null;

const EventMap = () => {
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { selectedEvent, setSelectedEvent } = useMapStore();
  const { myLocation, setMyLocation } = useMyLocationStore();
  const { sortedEvents } = useEventFilter();
  const [markers] = useState<Map<bigint, naver.maps.Marker>>(
    new Map<bigint, naver.maps.Marker>(),
  );
  const [searchQuery] = useQueryState('event-search', { defaultValue: '' });
  const navigate = useNavigate();

  // 마커 클릭 이벤트
  const handleMarkerClick = useCallback(
    (mapEvent: EventData) => {
      // 이전에 선택된 마커가 있다면 원래 아이콘으로 되돌리기
      if (selectedEvent) {
        const prevMarker = markers.get(selectedEvent.eventId);
        // 원래 아이콘으로 되돌리기
        prevMarker?.setIcon({
          content: getMarker(selectedEvent.category.name),
          size: new naver.maps.Size(36, 36),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(18, 18),
        });
      }

      setSelectedEvent(mapEvent); // 새 이벤트 선택

      const newMarker = markers.get(mapEvent.eventId);
      if (newMarker) {
        const markerContent = document.createElement('div');
        markerContent.innerHTML = `
          <div class="select-marker" style="position: relative;">
            <svg width="204" height="80" viewBox="0 0 204 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_643_14183)">
            <mask id="path-1-inside-1_643_14183" fill="white">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M32 2C16.536 2 4 14.536 4 30C4 45.464 16.536 58 32 58H91.9357C93.0516 58 94.1167 58.4661 94.8739 59.2858L99.0618 63.8193C100.645 65.5337 103.355 65.5337 104.938 63.8193L109.126 59.2858C109.883 58.4661 110.948 58 112.064 58H172C187.464 58 200 45.464 200 30C200 14.536 187.464 2 172 2H32Z"/>
            </mask>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M32 2C16.536 2 4 14.536 4 30C4 45.464 16.536 58 32 58H91.9357C93.0516 58 94.1167 58.4661 94.8739 59.2858L99.0618 63.8193C100.645 65.5337 103.355 65.5337 104.938 63.8193L109.126 59.2858C109.883 58.4661 110.948 58 112.064 58H172C187.464 58 200 45.464 200 30C200 14.536 187.464 2 172 2H32Z" fill="white"/>
            <path d="M109.126 59.2858L108.392 58.6072L109.126 59.2858ZM99.0618 63.8193L98.3272 64.4978L99.0618 63.8193ZM104.938 63.8193L105.673 64.4978L104.938 63.8193ZM5 30C5 15.0883 17.0883 3 32 3V1C15.9837 1 3 13.9837 3 30H5ZM32 57C17.0883 57 5 44.9117 5 30H3C3 46.0163 15.9837 59 32 59V57ZM91.9357 57H32V59H91.9357V57ZM99.7963 63.1407L95.6085 58.6072L94.1394 59.9643L98.3272 64.4978L99.7963 63.1407ZM108.392 58.6072L104.204 63.1407L105.673 64.4978L109.861 59.9643L108.392 58.6072ZM172 57H112.064V59H172V57ZM199 30C199 44.9117 186.912 57 172 57V59C188.016 59 201 46.0163 201 30H199ZM172 3C186.912 3 199 15.0883 199 30H201C201 13.9837 188.016 1 172 1V3ZM32 3H172V1H32V3ZM109.861 59.9643C110.429 59.3496 111.227 59 112.064 59V57C110.669 57 109.338 57.5827 108.392 58.6072L109.861 59.9643ZM98.3272 64.4978C100.307 66.6408 103.693 66.6408 105.673 64.4978L104.204 63.1407C103.016 64.4265 100.984 64.4265 99.7963 63.1407L98.3272 64.4978ZM91.9357 59C92.7726 59 93.5715 59.3496 94.1394 59.9643L95.6085 58.6072C94.662 57.5827 93.3306 57 91.9357 57V59Z" fill="#4AA662" mask="url(#path-1-inside-1_643_14183)"/>
            <rect x="10" y="8" width="44" height="44" rx="22" fill="#4AA662"/>
            <path d="M31.4501 35.6476L38.2298 28.8679C37.0892 28.3915 36.0534 27.6957 35.1809 26.8201C34.3049 25.9475 33.6088 24.9113 33.1322 23.7704L26.3525 30.55C25.8236 31.0789 25.5587 31.3439 25.3313 31.6354C25.0631 31.9795 24.8329 32.3517 24.6448 32.7454C24.4862 33.0791 24.3679 33.4348 24.1314 34.1443L22.8829 37.887C22.8255 38.0584 22.8169 38.2424 22.8583 38.4183C22.8997 38.5943 22.9893 38.7552 23.1171 38.883C23.2449 39.0108 23.4058 39.1004 23.5818 39.1418C23.7577 39.1832 23.9417 39.1747 24.1131 39.1172L27.8558 37.8687C28.5663 37.6322 28.921 37.5139 29.2547 37.3554C29.6501 37.1671 30.0201 36.9383 30.3648 36.6688C30.6563 36.4414 30.9212 36.1765 31.4501 35.6476ZM40.1108 26.9869C40.7867 26.311 41.1665 25.3941 41.1665 24.4382C41.1665 23.4822 40.7867 22.5653 40.1108 21.8894C39.4348 21.2134 38.518 20.8336 37.562 20.8336C36.606 20.8336 35.6892 21.2134 35.0132 21.8894L34.2001 22.7024L34.2349 22.8042C34.6355 23.9507 35.2912 24.9914 36.1526 25.8475C37.0344 26.7347 38.1114 27.4033 39.2977 27.8L40.1108 26.9869Z" fill="white"/>
            <path d="M72.7871 13.3301V22.4082H71.0371V13.3301H72.7871ZM73.1152 24.1445V25.5391H64.4473V21.5332H66.2109V24.1445H73.1152ZM67.1406 15.2168C67.127 16.8574 68.002 18.4707 70.0527 19.127L69.1641 20.4941C67.7627 20.0293 66.792 19.0996 66.2383 17.9102C65.6846 19.1885 64.6865 20.2139 63.2305 20.7129L62.3281 19.332C64.4199 18.6348 65.3223 16.8984 65.3223 15.2168V14.0137H67.1406V15.2168ZM85.5364 18.9629V20.3711H80.7239V21.2871C82.8909 21.4512 84.1692 22.2305 84.1829 23.5156C84.1692 24.9512 82.5423 25.7578 79.8489 25.7578C77.1145 25.7578 75.4876 24.9512 75.4876 23.5156C75.4876 22.2236 76.7796 21.4443 78.9876 21.2871V20.3711H74.1888V18.9629H85.5364ZM79.8489 22.5723C78.1263 22.5859 77.2513 22.8867 77.2649 23.5156C77.2513 24.1172 78.1263 24.4453 79.8489 24.4453C81.5305 24.4453 82.4192 24.1172 82.4329 23.5156C82.4192 22.8867 81.5305 22.5859 79.8489 22.5723ZM84.511 13.8496V15.2168H81.1341C81.428 16.0918 82.6927 16.9326 85.0579 17.1309L84.4427 18.498C82.0979 18.2725 80.512 17.3838 79.8489 16.1738C79.1927 17.3838 77.6341 18.2725 75.2688 18.498L74.6946 17.1309C76.9983 16.9326 78.2698 16.085 78.5911 15.2168H75.2278V13.8496H84.511ZM96.4947 13.3301V22.4766H94.7584V18.4023H91.6685V17.0352H94.7584V16.0781H91.6685V14.7109H94.7584V13.3301H96.4947ZM96.7955 24.1445V25.5391H88.2232V21.6562H89.9732V24.1445H96.7955ZM88.4283 14.1094V19.4277C89.9527 19.4141 91.3746 19.3115 92.9263 19.0312L93.1041 20.4395C91.2447 20.7949 89.563 20.8633 87.7037 20.8633H86.7056V14.1094H88.4283ZM111.261 13.3301V22.4082H109.525V17.9512H107.487V16.543H109.525V13.3301H111.261ZM111.562 24.1445V25.5391H103.003V21.6152H104.753V24.1445H111.562ZM105.478 15.7637C105.478 17.1992 106.353 18.7441 108.335 19.3867L107.474 20.7676C106.093 20.3232 105.15 19.4141 104.603 18.2793C104.056 19.5371 103.065 20.5352 101.595 21.0273L100.706 19.6055C102.757 18.9629 103.687 17.3359 103.7 15.75V15.5586H101.198V14.1641H107.952V15.5586H105.478V15.7637ZM122.547 13.3164V17.4043H124.133V18.8398H122.547V23.0234H120.797V13.3164H122.547ZM122.971 24.1445V25.5391H114.207V22.3809H115.957V24.1445H122.971ZM112.457 20.4668C113.353 20.4668 114.392 20.46 115.479 20.4258V19.7012C114.125 19.5166 113.278 18.8398 113.291 17.8691C113.278 16.6387 114.495 15.9141 116.34 15.9277C118.172 15.9141 119.375 16.6387 119.389 17.8691C119.375 18.833 118.548 19.5098 117.215 19.7012V20.3438C118.241 20.2822 119.266 20.1865 120.223 20.043L120.346 21.2461C117.721 21.752 114.782 21.7793 112.635 21.8066L112.457 20.4668ZM119.909 14.3281V15.5723H112.786V14.3281H115.479V13.2754H117.215V14.3281H119.909ZM116.34 17.0898C115.452 17.0898 114.946 17.3359 114.959 17.8691C114.946 18.334 115.452 18.5938 116.34 18.5938C117.215 18.5938 117.707 18.334 117.721 17.8691C117.707 17.3359 117.215 17.0898 116.34 17.0898ZM134.873 13.3164V25.7578H133.109V13.3164H134.873ZM131.14 14.6152C131.14 18.3887 129.814 21.5195 125.371 23.625L124.455 22.2305C127.668 20.7129 129.083 18.7441 129.363 15.9824H125.125V14.6152H131.14ZM149.324 18.6758V20.084H145.742V22.9414H150.569V24.3359H139.18V22.9414H143.979V20.084H140.451V14.2734H142.242V18.6758H149.324ZM161.759 14.6016V16.0098H151.546V14.6016H155.798V13.3027H157.535V14.6016H161.759ZM162.388 21.3555V22.7773H157.535V25.7715H155.798V22.7773H151V21.3555H162.388ZM156.673 16.4883C159.339 16.4883 160.953 17.2402 160.966 18.6211C160.953 20.002 159.339 20.7539 156.673 20.7539C153.98 20.7539 152.367 20.002 152.38 18.6211C152.367 17.2402 153.98 16.4883 156.673 16.4883ZM156.673 17.7734C155.005 17.7871 154.185 18.0469 154.185 18.6211C154.185 19.1816 155.005 19.4551 156.673 19.4551C158.314 19.4551 159.148 19.1816 159.148 18.6211C159.148 18.0469 158.314 17.7871 156.673 17.7734ZM173.305 13.3301V22.4219H171.569V19.4688H168.725C168.124 20.1045 167.256 20.4941 166.292 20.4941C164.405 20.4941 162.97 19.127 162.983 17.2812C162.97 15.4082 164.405 14.0547 166.292 14.041C167.256 14.0479 168.117 14.4307 168.725 15.0664H171.569V13.3301H173.305ZM173.606 24.1445V25.5391H165.048V21.5059H166.798V24.1445H173.606ZM166.292 15.5996C165.321 15.5996 164.624 16.2285 164.637 17.2812C164.624 18.3203 165.321 18.9492 166.292 18.9492C167.208 18.9492 167.919 18.3203 167.919 17.2812C167.919 16.2285 167.208 15.5996 166.292 15.5996ZM169.477 16.4609C169.539 16.7207 169.573 16.9941 169.573 17.2812C169.573 17.5547 169.539 17.8213 169.477 18.0742H171.569V16.4609H169.477ZM176.252 24.623C175.609 24.623 175.09 24.1035 175.104 23.4746C175.09 22.8457 175.609 22.3398 176.252 22.3398C176.854 22.3398 177.387 22.8457 177.387 23.4746C177.387 24.1035 176.854 24.623 176.252 24.623ZM180.203 24.623C179.561 24.623 179.041 24.1035 179.055 23.4746C179.041 22.8457 179.561 22.3398 180.203 22.3398C180.805 22.3398 181.338 22.8457 181.338 23.4746C181.338 24.1035 180.805 24.623 180.203 24.623ZM184.154 24.623C183.512 24.623 182.992 24.1035 183.006 23.4746C182.992 22.8457 183.512 22.3398 184.154 22.3398C184.756 22.3398 185.289 22.8457 185.289 23.4746C185.289 24.1035 184.756 24.623 184.154 24.623Z" fill="black"/>
            <path d="M72.7529 41.6279H62.457V40.8281H67.1162V39.5078H63.7646V35.7754H71.4707V36.5752H64.7422V38.6953H71.5469V39.5078H68.0811V40.8281H72.7529V41.6279ZM63.7012 44.4844C63.7012 44.057 63.8556 43.693 64.1646 43.3926C64.4735 43.0879 64.9199 42.8551 65.5039 42.6943C66.0879 42.5335 66.7861 42.4531 67.5986 42.4531C68.4027 42.4531 69.0946 42.5335 69.6743 42.6943C70.2541 42.8551 70.6984 43.0879 71.0073 43.3926C71.3205 43.693 71.4792 44.057 71.4834 44.4844C71.4792 44.916 71.3226 45.2821 71.0137 45.5825C70.7048 45.8872 70.2583 46.12 69.6743 46.2808C69.0946 46.4416 68.4027 46.5241 67.5986 46.5283C66.7861 46.5241 66.0879 46.4416 65.5039 46.2808C64.9199 46.12 64.4735 45.8872 64.1646 45.5825C63.8556 45.2778 63.7012 44.9118 63.7012 44.4844ZM64.7168 44.4844C64.7126 44.7425 64.8226 44.9668 65.0469 45.1572C65.2754 45.3434 65.6034 45.4852 66.0308 45.5825C66.4582 45.6799 66.9681 45.7285 67.5605 45.7285C68.4746 45.7285 69.1877 45.6206 69.6997 45.4048C70.216 45.189 70.4762 44.8822 70.4805 44.4844C70.4805 44.2262 70.3641 44.0041 70.1313 43.8179C69.8986 43.6317 69.5664 43.4899 69.1348 43.3926C68.7031 43.291 68.1911 43.2402 67.5986 43.2402C66.9977 43.2402 66.4793 43.291 66.0435 43.3926C65.6118 43.4899 65.2817 43.6317 65.0532 43.8179C64.8247 44.0041 64.7126 44.2262 64.7168 44.4844ZM77.2537 37.3369C77.2537 37.832 77.37 38.3081 77.6028 38.7651C77.8355 39.2222 78.1614 39.6263 78.5803 39.9775C78.9993 40.3288 79.4838 40.5996 80.0339 40.79L79.5261 41.5645C78.8829 41.3359 78.3222 41.0016 77.844 40.5615C77.37 40.1214 77.0125 39.6073 76.7712 39.019C76.53 39.658 76.1619 40.2188 75.6668 40.7012C75.1716 41.1794 74.5919 41.5391 73.9275 41.7803L73.3943 41.0059C73.9529 40.807 74.4501 40.5234 74.886 40.1553C75.3219 39.7829 75.6604 39.3534 75.9016 38.8667C76.1471 38.38 76.2719 37.8701 76.2761 37.3369V36.8545H73.699V36.042H79.7927V36.8545H77.2537V37.3369ZM74.867 42.6436H82.2556V46.5283H81.2654V43.4561H74.867V42.6436ZM81.2654 35.2422H82.2556V38.2256H83.9568V39.0762H82.2556V42.0469H81.2654V35.2422ZM87.8101 45.627C87.2642 45.627 86.7669 45.5233 86.3184 45.3159C85.874 45.1043 85.5186 44.8145 85.252 44.4463C84.9896 44.0739 84.8478 43.6549 84.8267 43.1895H85.9312C85.9566 43.4603 86.056 43.7036 86.2295 43.9194C86.403 44.1353 86.6273 44.3066 86.9024 44.4336C87.1817 44.5605 87.4842 44.624 87.8101 44.624C88.2036 44.624 88.5549 44.5352 88.8638 44.3574C89.1769 44.1797 89.4224 43.9364 89.6001 43.6274C89.7779 43.3185 89.8667 42.9736 89.8667 42.5928C89.8667 42.1992 89.7736 41.8459 89.5874 41.5327C89.4055 41.2153 89.1515 40.9657 88.8257 40.7837C88.5041 40.6017 88.1402 40.5107 87.7339 40.5107C86.9087 40.498 86.3374 40.7731 86.02 41.3359H84.9155L85.563 36.3086H90.5396V37.3242H86.5152L86.1724 40.0156H86.2612C86.4728 39.8548 86.7246 39.7257 87.0166 39.6284C87.3128 39.5311 87.6196 39.4824 87.937 39.4824C88.5126 39.4824 89.0309 39.6157 89.4922 39.8823C89.9577 40.1447 90.3216 40.5107 90.584 40.9805C90.8506 41.4502 90.9839 41.9792 90.9839 42.5674C90.9839 43.1514 90.8464 43.6761 90.5713 44.1416C90.2962 44.6071 89.9175 44.971 89.4351 45.2334C88.9569 45.4958 88.4152 45.627 87.8101 45.627ZM95.3196 45.627C94.6425 45.627 94.0628 45.4429 93.5804 45.0747C93.1022 44.7065 92.7361 44.1691 92.4822 43.4624C92.2325 42.7557 92.1077 41.903 92.1077 40.9043C92.1077 39.9183 92.2325 39.0719 92.4822 38.3652C92.7361 37.6543 93.1043 37.1126 93.5867 36.7402C94.0691 36.3678 94.6468 36.1816 95.3196 36.1816C95.9882 36.1816 96.5637 36.3678 97.0462 36.7402C97.5286 37.1126 97.8968 37.6543 98.1507 38.3652C98.4046 39.0719 98.5315 39.9183 98.5315 40.9043C98.5315 41.903 98.4046 42.7557 98.1507 43.4624C97.901 44.1691 97.5349 44.7065 97.0525 45.0747C96.5743 45.4429 95.9967 45.627 95.3196 45.627ZM93.2122 40.9043C93.2122 41.6914 93.2947 42.3621 93.4597 42.9165C93.629 43.4709 93.8702 43.8919 94.1834 44.1797C94.4965 44.4674 94.8753 44.6113 95.3196 44.6113C95.7597 44.6113 96.1363 44.4674 96.4495 44.1797C96.7669 43.8919 97.006 43.4709 97.1668 42.9165C97.3318 42.3621 97.4143 41.6914 97.4143 40.9043C97.4143 40.1172 97.3318 39.4443 97.1668 38.8857C97.0017 38.3271 96.7626 37.9019 96.4495 37.6099C96.1363 37.3179 95.7597 37.1719 95.3196 37.1719C94.8795 37.1719 94.5029 37.3179 94.1897 37.6099C93.8766 37.9019 93.6354 38.3271 93.4661 38.8857C93.2968 39.4443 93.2122 40.1172 93.2122 40.9043ZM108.694 36.3848H106.955V38.5684H108.656V39.3428H100.392V38.5684H102.093V36.3848H100.354V35.5977H108.694V36.3848ZM99.3887 40.2949H109.672V41.0947H99.3887V40.2949ZM100.633 42.1104H108.352V44.5605H101.648V45.6396H108.694V46.4014H100.658V43.8369H107.374V42.8594H100.633V42.1104ZM105.965 38.5684V36.3848H103.083V38.5684H105.965ZM119.708 46.5537H118.718V40.4219H116.521V39.584H118.718V35.2422H119.708V46.5537ZM110.758 36.2959H115.836V40.2441H111.786V42.9863C112.84 42.9863 113.741 42.9609 114.49 42.9102C115.243 42.8594 116.009 42.762 116.788 42.6182L116.864 43.4561C116.06 43.5999 115.264 43.6994 114.477 43.7544C113.694 43.8052 112.755 43.8327 111.659 43.8369H110.796V39.4189H114.871V37.1211H110.758V36.2959ZM126.963 36.9053C126.963 37.5231 127.171 38.1177 127.586 38.689C128 39.2603 128.529 39.7469 129.172 40.1489C129.82 40.5467 130.476 40.807 131.14 40.9297L130.683 41.7676C130.103 41.6322 129.534 41.4121 128.976 41.1074C128.421 40.8027 127.922 40.4261 127.478 39.9775C127.033 39.529 126.693 39.0381 126.456 38.5049C126.219 39.0381 125.878 39.529 125.434 39.9775C124.989 40.4219 124.488 40.7985 123.929 41.1074C123.375 41.4121 122.808 41.6322 122.228 41.7676L121.771 40.9297C122.435 40.8027 123.087 40.5404 123.726 40.1426C124.369 39.7448 124.896 39.2603 125.307 38.689C125.717 38.1177 125.922 37.5231 125.922 36.9053V36.042H126.963V36.9053ZM121.339 44.167H131.673V44.9922H121.339V44.167ZM141.9 43.71H140.948V35.2422H141.9V43.71ZM132.353 41.3105C132.823 41.0905 133.235 40.7858 133.591 40.3965C133.946 40.0029 134.219 39.5734 134.409 39.1079C134.6 38.6382 134.693 38.179 134.689 37.7305V36.042H135.654V37.7305C135.654 38.1748 135.743 38.6107 135.92 39.0381C136.102 39.4655 136.362 39.8527 136.701 40.1997C137.044 40.5467 137.448 40.8197 137.913 41.0186L137.355 41.8057C136.847 41.5729 136.407 41.2513 136.034 40.8408C135.666 40.4303 135.383 39.9627 135.184 39.438C134.977 40.0135 134.676 40.534 134.283 40.9995C133.893 41.465 133.436 41.8268 132.911 42.085L132.353 41.3105ZM134.498 42.6689H135.489V45.4492H142.243V46.2871H134.498V42.6689ZM136.936 38.1113H138.713V35.4707H139.678V43.3926H138.713V38.9365H136.936V38.1113ZM152.647 46.5537H151.656V40.333H149.27V39.5078H151.656V35.2422H152.647V46.5537ZM143.811 36.2832H149.079V37.1084H144.814V39.457H148.584V40.2695H144.814V42.999C145.927 42.9948 146.845 42.9694 147.568 42.9229C148.296 42.8763 149.028 42.7874 149.765 42.6562L149.879 43.4814C149.075 43.6126 148.286 43.7036 147.511 43.7544C146.741 43.8009 145.795 43.8242 144.674 43.8242H143.811V36.2832Z" fill="black"/>
            <circle cx="102" cy="71" r="3" fill="#4AA662"/>
            </g>
            <defs>
            <filter id="filter0_d_643_14183" x="0" y="0" width="204" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_643_14183"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_643_14183" result="shape"/>
            </filter>
            </defs>
            </svg>
            <div class="selected-marker-content" style="
              position: absolute;
              top: 10.5px;
              right: 14px;
              width: 128px;
              height: 44px;
              border-top-right-radius: ${theme.borderRadius.lg};
              border-bottom-right-radius: ${theme.borderRadius.lg};
              color: ${theme.color.gray[900]};
              background: ${theme.color.gray[0]};
            ">
              <div class="title" style="
                font-size: 14px;
                font-weight: bold;
                height: 19px;
                ${theme.typeFace.caption['14B']};
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              ">${mapEvent.title}</div>
              <div class="center" style="
                font-size: 13px;
                height: 18px;
                ${theme.typeFace.caption['13R']};
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              ">${mapEvent.center}</div>
            </div>
          </div>
        `;
        newMarker.setIcon({
          content: markerContent,
          size: new naver.maps.Size(196, 72),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(98, 36),
        });
      }

      // 지도 중심 변경
      mapInstance?.setCenter(
        new naver.maps.LatLng(mapEvent.latitude, mapEvent.longitude),
      );
      mapInstance?.setZoom(18);

      // 이벤트 정보 BottomSheet 활성화
      setActiveBottomSheet(BOTTOM_SHEET_ID_EVENT_INFO);
    },
    [markers, selectedEvent, setSelectedEvent, setActiveBottomSheet],
  );

  const initMap = useCallback(
    (centerLat: number, centerLng: number) => {
      const mapDiv = document.getElementById('map');
      if (!mapDiv || mapInstance) return;
      mapInstance = new naver.maps.Map(mapDiv, {
        center: new naver.maps.LatLng(centerLat, centerLng),
        zoom: 15,
        // zoomControl: true,
        // zoomControlOptions: {
        //   style: naver.maps.ZoomControlStyle.SMALL,
        //   position: naver.maps.Position.TOP_RIGHT,
        // },
      });

      const myLocMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(centerLat, centerLng),
        map: mapInstance,
        icon: {
          content: getMarker('my_location'),
          size: new naver.maps.Size(36, 36),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(18, 18),
        },
      });
      markers.set(0n, myLocMarker);

      // 이벤트 마커들
      sortedEvents.forEach((event: EventData) => {
        const markerOptions = {
          position: new naver.maps.LatLng(event.latitude, event.longitude),
          map: mapInstance as naver.maps.Map,
          icon: {
            content: getMarker(event.category.name),
            size: new naver.maps.Size(36, 36),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(18, 18),
          },
        };
        const marker = new naver.maps.Marker(markerOptions);
        markers.set(event.eventId, marker); // 각 이벤트 마커들은 event id로 구분

        // 이벤트 마커 클릭 이벤트
        naver.maps.Event.addListener(marker, 'click', () =>
          handleMarkerClick(event),
        );
      });
    },
    [handleMarkerClick, markers, sortedEvents],
  );

  // sortedEvents 변경시 마커 업데이트
  useEffect(() => {
    if (!mapInstance || !sortedEvents) return;

    // 기존 마커 제거
    markers.forEach((marker, key) => {
      if (key !== 0n) {
        marker.setMap(null); // 'my_location' 마커는 건드리지 않음
      }
    });
    markers.clear();

    // 새로운 마커 생성
    sortedEvents.forEach((event) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(event.latitude, event.longitude),
        map: mapInstance as naver.maps.Map,
        icon: {
          content: getMarker(event.category.name),
          size: new naver.maps.Size(36, 36),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(18, 18),
        },
      });

      // 마커 클릭 이벤트 등록
      naver.maps.Event.addListener(marker, 'click', () =>
        handleMarkerClick(event),
      );
      markers.set(event.eventId, marker);
    });
  }, [sortedEvents, handleMarkerClick, markers]);

  const handleLocationSuccess = useCallback(
    async (position: GeolocationPosition) => {
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setMyLocation(
        new naver.maps.LatLng(newLocation.latitude, newLocation.longitude),
      );
      initMap(newLocation.latitude, newLocation.longitude);
    },
    [initMap, setMyLocation],
  );

  const showLocationConfirm = useCallback(() => {
    confirm(
      <LocationConfirm
        onLocationAllow={async () => {
          try {
            const position = await getCurrentPosition();
            await handleLocationSuccess(position);
            localStorage.setItem('curr-location-agree', 'true');
          } catch (error) {
            console.error('위치 정보를 가져오는데 실패했습니다:', error);
          }
        }}
      />,
    );
  }, [handleLocationSuccess]);

  useEffect(() => {
    const locationAgreed = localStorage.getItem('curr-location-agree');

    if (locationAgreed === null) {
      showLocationConfirm();
    } else if (locationAgreed === 'true') {
      getCurrentPosition().then(handleLocationSuccess);
    }
  }, [handleLocationSuccess, showLocationConfirm]);

  // 내 위치로 이동
  const handleMyLocationClick = useCallback(() => {
    if (myLocation) {
      mapInstance?.setCenter(
        new naver.maps.LatLng(myLocation.lat(), myLocation.lng()),
      );
      mapInstance?.setZoom(15);
    } else {
      showLocationConfirm(); // 위치 동의 띄우기
    }
  }, [myLocation, showLocationConfirm]);

  const handleGotoListBtnClick = () => {
    if (searchQuery.length > 1) navigate(ROUTES.EVENT_SEARCH);
    else navigate(ROUTES.EVENT);
  };

  return (
    <S.MapContainer>
      <S.Map id="map" />
      <S.BottomContainer>
        <S.ButtonContainer>
          <SquareButton icon="myLocation" onClick={handleMyLocationClick} />
          <RoundedButton
            icon="menu"
            text="목록 보기"
            onClick={handleGotoListBtnClick}
          />
        </S.ButtonContainer>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <S.EventCardWrapper>
              <EventCard id={selectedEvent.eventId as bigint} />
            </S.EventCardWrapper>
          </motion.div>
        )}
      </S.BottomContainer>
    </S.MapContainer>
  );
};

export default EventMap;
