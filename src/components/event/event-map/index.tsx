import * as S from './style';
import { useEffect, useCallback, useState } from 'react';
import { useQueryState } from 'nuqs';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  EventCard,
  LocationConfirm,
  SquareButton,
  RoundedButton,
  DeferredLoader,
} from '@/components';
import { useMyLocationStore, useMapStore } from '@/stores';
import { confirm, getMarker, getCurrentPosition } from '@/utils';
import { ROUTES } from '@/constants/routes';
import { useEventFilter } from '@/hooks';
import { EventData } from '@/types/event';
// import { theme } from '@/styles/theme';

window.navermap_authFailure = function () {
  console.error('네이버 지도 인증 실패');
  // throw new Error('네이버 지도 인증 실패'); // ErrorFallback 개발 후 에러 바운더리로 던지기
};

let mapInstance: naver.maps.Map | null = null;

const EventMap = () => {
  // localStorage.clear();
  const { selectedEvent, setSelectedEvent } = useMapStore();
  const { myLocation, setMyLocation } = useMyLocationStore();
  const { sortedEvents } = useEventFilter();
  const [markers] = useState<Map<bigint, naver.maps.Marker>>(
    new Map<bigint, naver.maps.Marker>(),
  );
  const [searchQuery] = useQueryState('event-search', { defaultValue: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 마커 클릭 이벤트
  const handleMarkerClick = useCallback(
    (mapEvent: EventData) => {
      setSelectedEvent(mapEvent);
      // const newMarker = markers.get(mapEvent.eventId);
      // if (newMarker) {
      //   // 포커스 마커 추가
      //   const focusMarkerContent = document.createElement('div');
      //   focusMarkerContent.innerHTML = `
      //     <div class="select-marker" style="position: relative;">
      //     <svg xmlns="http://www.w3.org/2000/svg" width="256" height="74" fill="none" viewBox="0 0 256 74"><g filter="url(#a)"><path fill="#000" fill-rule="evenodd" d="M24 16a8 8 0 0 0-8 8v20.24a8 8 0 0 0 8 8h97.937a2 2 0 0 1 1.609.813l2.844 3.858a2 2 0 0 0 3.22 0l2.844-3.858a2 2 0 0 1 1.609-.813H232a8 8 0 0 0 8-8V24a8 8 0 0 0-8-8H24Z" clip-rule="evenodd"/></g><path fill="#fff" d="M39.676 34.822H34.78v1.039c1.117.073 1.983.298 2.598.677.615.373.925.877.93 1.51 0 .47-.174.868-.52 1.197-.342.332-.834.585-1.477.758-.637.174-1.399.26-2.283.26-.898 0-1.67-.086-2.317-.26-.643-.168-1.135-.419-1.477-.752a1.618 1.618 0 0 1-.512-1.203c0-.633.31-1.139.93-1.517.62-.378 1.494-.604 2.624-.677v-1.032H28.41v-1.23h11.266v1.23Zm-10.719-2.994a7.834 7.834 0 0 0 1.962-.417c.579-.21 1.041-.465 1.388-.766.35-.3.57-.622.656-.964h-3.527v-1.217h9.228v1.217h-3.562c.083.342.297.665.643.97.351.302.816.557 1.395.767a8.312 8.312 0 0 0 2.003.41l-.534 1.203c-1.116-.114-2.076-.38-2.878-.8-.797-.424-1.364-.95-1.702-1.58-.337.634-.902 1.16-1.695 1.58-.793.42-1.746.686-2.857.8l-.52-1.203Zm2.31 6.22c-.004.338.226.597.691.78.465.182 1.14.273 2.023.273.907 0 1.6-.089 2.079-.267.483-.177.726-.44.731-.786-.005-.342-.244-.601-.718-.779-.474-.178-1.155-.269-2.044-.273-.902.004-1.59.095-2.064.273-.47.178-.702.438-.697.78Zm19.312-1.011h-1.517V32.92h-3.227v-1.203h3.227v-1.12h-3.227v-1.204h3.227v-1.463h1.517v9.106Zm-9.638-8.285h1.504v5.345c.847-.009 1.65-.043 2.406-.102a24.744 24.744 0 0 0 2.31-.308l.15 1.23c-.879.17-1.738.283-2.576.342-.839.06-1.78.091-2.824.096h-.97v-6.603Zm1.517 7.478h1.532v2.57h6.904v1.23h-8.436v-3.8Zm12.968-7.41a2.66 2.66 0 0 1 1.504.444c.447.296.81.718 1.087 1.265h2.892v-2.611h1.504V40.29h-1.504v-4.676h-2.782c-.27.62-.639 1.098-1.108 1.435-.47.338-1 .506-1.593.506a2.72 2.72 0 0 1-1.654-.533c-.478-.36-.852-.87-1.121-1.531-.264-.661-.397-1.431-.397-2.31 0-.876.133-1.642.397-2.298.269-.66.645-1.169 1.128-1.524a2.685 2.685 0 0 1 1.647-.54Zm-1.709 4.361c0 .625.071 1.162.212 1.613.142.452.34.796.595 1.033.26.237.56.357.902.362.342-.005.643-.125.903-.362s.46-.581.601-1.033c.146-.45.219-.988.219-1.613 0-.62-.073-1.155-.219-1.606-.141-.451-.342-.796-.601-1.032a1.298 1.298 0 0 0-.903-.356c-.342 0-.642.12-.902.362-.255.237-.453.581-.595 1.032-.141.447-.212.98-.212 1.6Zm4.73-1.408c.092.442.137.911.137 1.408 0 .424-.034.825-.102 1.203h2.427v-2.611h-2.461Zm9.947-2.078c-.004.57.103 1.11.322 1.62.223.506.553.952.99 1.34.438.383.972.672 1.6.868l-.82 1.19a4.985 4.985 0 0 1-1.702-1.005 4.66 4.66 0 0 1-1.114-1.545 5.175 5.175 0 0 1-1.197 1.79 5.135 5.135 0 0 1-1.88 1.142l-.806-1.23c.665-.219 1.228-.536 1.688-.95.46-.415.805-.891 1.033-1.43.232-.541.35-1.116.355-1.722v-1.176h1.531v1.108Zm-2.556 8.203a1.767 1.767 0 0 1 .499-1.278c.337-.36.82-.634 1.449-.82.633-.188 1.383-.281 2.249-.281.87 0 1.622.093 2.256.28.633.187 1.119.46 1.456.82.342.356.513.782.513 1.279 0 .497-.171.923-.513 1.278-.337.356-.823.625-1.456.807-.634.187-1.386.28-2.256.28-.866 0-1.616-.093-2.249-.28-.629-.182-1.112-.451-1.45-.807a1.767 1.767 0 0 1-.498-1.278Zm1.504 0c-.005.374.228.663.697.868.47.2 1.135.303 1.996.308.866-.005 1.534-.107 2.003-.308.47-.205.704-.494.704-.868 0-.387-.235-.684-.704-.889-.465-.205-1.133-.31-2.003-.314-.866.004-1.534.11-2.003.314-.465.205-.695.502-.69.889Zm2.898-7.588h2.461v-2.392h1.518v7.273H72.7v-3.637h-2.46V30.31Zm19.757 4.512h-4.895v1.039c1.117.073 1.982.298 2.598.677.615.373.925.877.93 1.51 0 .47-.174.868-.52 1.197-.342.332-.834.585-1.477.758-.638.174-1.399.26-2.283.26-.898 0-1.67-.086-2.317-.26-.643-.168-1.135-.419-1.477-.752a1.618 1.618 0 0 1-.513-1.203c0-.633.31-1.139.93-1.517.62-.378 1.495-.604 2.625-.677v-1.032h-4.867v-1.23h11.266v1.23Zm-10.72-2.994a7.834 7.834 0 0 0 1.963-.417c.578-.21 1.041-.465 1.387-.766.351-.3.57-.622.657-.964h-3.528v-1.217h9.229v1.217h-3.562c.082.342.296.665.643.97.35.302.816.557 1.394.767a8.31 8.31 0 0 0 2.003.41l-.533 1.203c-1.117-.114-2.076-.38-2.878-.8-.797-.424-1.365-.95-1.702-1.58-.337.634-.902 1.16-1.695 1.58-.793.42-1.746.686-2.858.8l-.52-1.203Zm2.311 6.22c-.004.338.226.597.69.78.466.182 1.14.273 2.024.273.907 0 1.6-.089 2.078-.267.483-.177.727-.44.732-.786-.005-.342-.244-.601-.718-.779-.474-.178-1.155-.269-2.044-.273-.902.004-1.59.095-2.064.273-.47.178-.702.438-.698.78Zm18.711-7.123h1.722v1.244h-1.722v2.995h-1.518v-7.247h1.518v3.008Zm-9.79 3.2c.926-.251 1.725-.581 2.4-.992.679-.41 1.214-.88 1.606-1.408.392-.533.632-1.11.718-1.73H91.07v-1.23h5.81c0 1.071-.225 2.042-.676 2.912-.451.866-1.108 1.609-1.969 2.229-.861.62-1.903 1.103-3.124 1.449l-.602-1.23Zm1.668 3.664a1.856 1.856 0 0 1 .506-1.313c.342-.374.825-.66 1.45-.861.624-.2 1.349-.301 2.173-.301.83 0 1.554.1 2.174.3.624.201 1.105.488 1.442.862.342.374.513.811.513 1.313 0 .505-.171.945-.513 1.319-.337.374-.817.658-1.442.854-.62.2-1.344.301-2.174.301-.825 0-1.55-.1-2.174-.3-.624-.197-1.107-.481-1.449-.855a1.865 1.865 0 0 1-.506-1.32Zm1.504 0c0 .264.105.494.315.69.21.191.51.34.902.444.397.1.866.15 1.408.15.538 0 1.005-.05 1.402-.15.396-.105.701-.253.916-.444a.908.908 0 0 0 .321-.69c-.005-.406-.241-.72-.71-.944-.47-.228-1.113-.342-1.929-.342-.542 0-1.011.05-1.408.15-.392.101-.693.25-.902.445a.902.902 0 0 0-.315.69Zm18.724-3.05h-3.664v2.83h4.922v1.245H102.37V37.57h4.867v-2.83h-3.5v-5.907h8.573v1.217h-7.055v3.487h7.15v1.203Zm15.122 2.216h-1.531V27.93h1.531v9.024Zm-10.281-2.913a4.572 4.572 0 0 0 1.654-.99 4.324 4.324 0 0 0 1.025-1.491c.233-.56.347-1.142.342-1.743v-1.203h1.572v1.203c-.004.583.105 1.14.329 1.668a4.1 4.1 0 0 0 1.011 1.408c.447.406.989.715 1.627.93l-.779 1.203a4.98 4.98 0 0 1-1.791-1.067 5.029 5.029 0 0 1-1.169-1.674 5.278 5.278 0 0 1-1.19 1.804 5.023 5.023 0 0 1-1.838 1.156l-.793-1.204Zm2.105 2.051h1.531V38.8h6.987v1.23h-8.518v-3.937Zm13.474-4.402c0 .656.091 1.292.273 1.907a5.25 5.25 0 0 0 .841 1.668c.379.497.846.896 1.402 1.196l-.848 1.121a4.506 4.506 0 0 1-1.436-1.21 6.11 6.11 0 0 1-.936-1.784 6.968 6.968 0 0 1-.937 1.942 4.558 4.558 0 0 1-1.435 1.34l-.889-1.149a4.407 4.407 0 0 0 1.408-1.285 5.7 5.7 0 0 0 .841-1.764 7.453 7.453 0 0 0 .28-1.982v-.383h-2.105v-1.23h2.105v-1.723h1.436v1.723h2.064v1.23h-2.064v.383Zm1.299.97h1.613V28.15h1.436v11.525h-1.436V33.92h-1.613v-1.257Zm4.115-4.744h1.449v12.36h-1.449v-12.36Zm12.421 3.008h1.668v1.272h-1.668v2.994h-1.517v-7.274h1.517v3.008Zm-9.898 3.022c1.335 0 2.374-.01 3.117-.028v-.622c-.706-.073-1.258-.248-1.654-.526-.397-.283-.593-.647-.588-1.094 0-.328.121-.61.362-.847.246-.242.593-.424 1.039-.547.451-.128.978-.192 1.579-.192.602 0 1.126.064 1.573.192.451.123.797.305 1.039.547.246.237.369.52.369.847 0 .442-.196.805-.588 1.087-.388.278-.925.454-1.613.526v.575a38.622 38.622 0 0 0 3.103-.274l.123.957a30.822 30.822 0 0 1-3.616.383 92.95 92.95 0 0 1-4.081.082l-.164-1.066Zm.314-5.196h2.803v-.93h1.518v.93h2.775v1.04h-7.096v-1.04Zm1.326 6.932h8.258v2.666h-6.713v.793h7.151v1.025h-8.668v-2.761h6.713v-.697h-6.741v-1.026Zm.698-4.006c-.005.219.125.388.389.506.269.119.645.178 1.128.178.483 0 .859-.06 1.128-.178.269-.118.404-.287.404-.506 0-.2-.135-.353-.404-.458-.264-.11-.64-.166-1.128-.17-.487.004-.863.06-1.128.17-.264.105-.394.258-.389.458Zm20.87 3.377h-11.279v-1.217h4.894v-1.175h-3.513v-4.184h8.531v1.19h-7.014v1.79h7.082v1.204h-3.595v1.175h4.894v1.217Zm-9.967 2.967c0-.479.171-.886.513-1.224.346-.341.841-.599 1.483-.772.648-.173 1.418-.26 2.311-.26.889 0 1.652.087 2.29.26.643.173 1.135.43 1.477.772.341.338.512.745.512 1.224 0 .474-.171.88-.512 1.217-.342.337-.834.595-1.477.772-.638.178-1.401.267-2.29.267-.893 0-1.663-.089-2.311-.267-.642-.177-1.137-.435-1.483-.772a1.647 1.647 0 0 1-.513-1.217Zm1.545 0c-.004.355.224.624.684.807.465.182 1.141.273 2.03.273.912 0 1.607-.089 2.085-.267.479-.182.72-.453.725-.813-.005-.355-.244-.627-.718-.813-.474-.187-1.155-.28-2.044-.28-.898 0-1.584.093-2.058.28-.474.186-.708.458-.704.813Zm23.298.766h-11.293v-1.272h11.293v1.272Zm-10.364-9.721h9.379v1.217h-1.804v3.937h1.763v1.203h-9.297V34.22h1.737v-3.937h-1.778v-1.217Zm6.071 5.154v-3.937h-2.776v3.937h2.776Zm16.112 4.621h-11.293v-1.258h4.867v-2.01h-3.527v-4.046h7.109v-1.531h-7.136v-1.23h8.64v3.964h-7.095v1.6h7.383v1.244h-3.87v2.01h4.922v1.257Zm10.357-8.326c0 .738-.009 1.372-.027 1.9a28.421 28.421 0 0 1-.424 4.06l-1.545-.136c.15-.752.26-1.462.328-2.133.068-.674.109-1.276.123-1.804.018-.529.027-1.158.027-1.887v-.164h-7.123v-1.23h8.641v1.394Zm-9.83 6.822h11.266v1.244h-11.266v-1.244Zm22.388-2.091h-1.449v-3.104h-1.286v2.98h-1.421v-6.958h1.421v2.748h1.286v-2.98h1.449v7.314Zm-10.063-6.563h4.703v3.569h-3.212v1.34c.765-.01 1.437-.037 2.016-.083a15.445 15.445 0 0 0 1.771-.246l.136 1.203c-.647.119-1.285.199-1.914.24-.629.04-1.383.061-2.262.061h-1.224v-3.65h3.227v-1.23h-3.241v-1.204Zm1.723 7.082h8.34v4.361h-8.34v-4.36Zm6.836 3.131v-1.914h-5.318v1.914h5.318Zm4.259.273a1.069 1.069 0 0 1-1.066-1.066 1.07 1.07 0 0 1 1.066-1.053c.187 0 .36.048.52.144.164.096.293.225.389.39a1.037 1.037 0 0 1 0 1.053 1.066 1.066 0 0 1-.389.389.994.994 0 0 1-.52.143Zm3.814 0a1.058 1.058 0 0 1-.922-.533 1.037 1.037 0 0 1 0-1.053 1.06 1.06 0 0 1 .922-.533c.187 0 .36.048.52.144a1.07 1.07 0 0 1 .533.909 1.069 1.069 0 0 1-.533.923.994.994 0 0 1-.52.143Zm3.815 0a1.069 1.069 0 0 1-1.066-1.066 1.07 1.07 0 0 1 1.066-1.053c.187 0 .36.048.519.144.165.096.294.225.39.39a1.037 1.037 0 0 1 0 1.053 1.061 1.061 0 0 1-.39.389.988.988 0 0 1-.519.143Z"/><defs><filter id="a" width="256" height="73.724" x="0" y="0" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="8"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2018_14847"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_2018_14847" result="shape"/></filter></defs></svg>
      //       <div class="selected-marker-content" style="
      //         position: absolute;
      //         top: 10.5px;
      //         right: 14px;
      //         width: 128px;
      //         height: 44px;
      //         border-radius: ${theme.borderRadius.sm};
      //         color: ${theme.color.gray[0]};
      //         background: ${theme.color.gray[900]};
      //       ">
      //         <div class="title" style="
      //           font-size: 14px;
      //           font-weight: bold;
      //           height: 19px;
      //           ${theme.typeFace.caption['14B']};
      //           text-overflow: ellipsis;
      //           overflow: hidden;
      //           white-space: nowrap;
      //         ">${mapEvent.title}</div>
      //       </div>
      //     </div>
      //   `;

      //   const focusMarker = new naver.maps.Marker({
      //     position: new naver.maps.LatLng(
      //       mapEvent.latitude,
      //       mapEvent.longitude,
      //     ),
      //     map: mapInstance ?? undefined,
      //     icon: {
      //       content: focusMarkerContent, // 포커스 마커 아이콘
      //       size: new naver.maps.Size(196, 72),
      //       origin: new naver.maps.Point(0, 0),
      //       anchor: new naver.maps.Point(98, 36),
      //     },
      //   });

      //   // 포커스가 풀리면 마커 제거
      //   const removeFocusMarker = () => {
      //     focusMarker.setMap(null);
      //     naver.maps.Event.removeListener(
      //       newMarker,
      //       'click',
      //       removeFocusMarker,
      //     );
      //   };

      //   naver.maps.Event.addListener(newMarker, 'click', removeFocusMarker);
      // }

      // 지도 중심 변경
      mapInstance?.setCenter(
        new naver.maps.LatLng(mapEvent.latitude, mapEvent.longitude),
      );
      mapInstance?.setZoom(18);
    },
    [setSelectedEvent],
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

  // console.log('sortedEvents', sortedEvents);
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
            setIsLoading(true); // 위치 요청 시작 시 로딩 시작
            const position = await getCurrentPosition();
            await handleLocationSuccess(position);
            localStorage.setItem('curr-location-agree', 'true');
          } catch (error) {
            console.error('위치 정보를 가져오는데 실패했습니다:', error);
          } finally {
            setIsLoading(false); // 위치 요청 완료 후 로딩 종료
          }
        }}
      />,
    );
  }, [handleLocationSuccess]);

  useEffect(() => {
    const locationAgreed = localStorage.getItem('curr-location-agree');
    setIsLoading(true);
    if (locationAgreed === null) {
      showLocationConfirm();
    } else if (locationAgreed === 'true') {
      getCurrentPosition()
        .then(handleLocationSuccess)
        .catch((error) => {
          console.error('위치 정보를 가져오는데 실패했습니다:', error);
        })
        .finally(() => {
          setIsLoading(false); // 위치 요청 완료 후 로딩 종료
        });
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
    const targetRoute =
      searchQuery.length > 1 ? ROUTES.EVENT_SEARCH : ROUTES.EVENT;

    navigate({
      pathname: targetRoute,
      search: location.search, // 현재 쿼리 파람 유지
    });
  };

  // console.log(isLoading);

  if (isLoading)
    return <DeferredLoader text={'위치 정보를 가져오는 중이에요...'} />;

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
            key={selectedEvent.eventId}
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
