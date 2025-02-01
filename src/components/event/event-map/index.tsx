import * as S from './style';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryState } from 'nuqs';
import { motion } from 'framer-motion';
import {
  EventCard,
  LocationConfirm,
  SquareButton,
  RoundedButton,
} from '@/components';
import { useMyLocationStore, useMapStore } from '@/stores';
import { confirm, getMarker, getCurrentPosition } from '@/utils';
import { ROUTES } from '@/constants/routes';
import { useEventFilter } from '@/hooks';
import { EventData } from '@/types/event';
// import { theme } from '@/styles/theme';

window.navermap_authFailure = function () {
  console.error('네이버 지도 인증 실패');
  throw new Error('네이버 지도 인증 실패');
};

let mapInstance: naver.maps.Map | null = null;

const EventMap = () => {
  const { selectedEvent, setSelectedEvent } = useMapStore();
  const { myLocation, setMyLocation } = useMyLocationStore();
  const { sortedEvents, activeFilterCount } = useEventFilter();
  const [markers] = useState<Map<bigint, naver.maps.Marker>>(
    new Map<bigint, naver.maps.Marker>(),
  );
  const [balloonMarkers] = useState<Map<bigint, naver.maps.Marker>>(new Map()); // 말풍선 마커 관리
  const [searchQuery] = useQueryState('event-search', { defaultValue: '' });
  const navigate = useNavigate();

  // // 마커 클릭 이벤트
  // const handleMarkerClick = useCallback(
  //   (mapEvent: EventData) => {
  //     // 이전에 선택된 마커가 있다면 흰 말풍선으로 되돌리기
  //     if (selectedEvent) {
  //       const prevMarker = markers.get(selectedEvent.eventId);
  //       // 원래 아이콘으로 되돌리기
  //       prevMarker?.setIcon({
  //         content: getMarker(selectedEvent.category.name),
  //         size: new naver.maps.Size(36, 36),
  //         origin: new naver.maps.Point(0, 0),
  //         anchor: new naver.maps.Point(18, 18),
  //       });
  //     }

  //     setSelectedEvent(mapEvent); // 새 이벤트 선택

  //     const newMarker = markers.get(mapEvent.eventId);
  //     if (newMarker) {
  //       const markerContent = document.createElement('div');
  //       markerContent.innerHTML = `
  //         <div class="select-marker" style="position: relative;">
  //           <div class="selected-marker-content" style="
  //             position: absolute;
  //             top: 10.5px;
  //             right: 14px;
  //             width: 128px;
  //             height: 44px;
  //             border-top-right-radius: ${theme.borderRadius.lg};
  //             border-bottom-right-radius: ${theme.borderRadius.lg};
  //             color: ${theme.color.gray[900]};
  //             background: ${theme.color.gray[0]};
  //           ">
  //             <div class="title" style="
  //               font-size: 14px;
  //               font-weight: bold;
  //               height: 19px;
  //               ${theme.typeFace.caption['14B']};
  //               text-overflow: ellipsis;
  //               overflow: hidden;
  //               white-space: nowrap;
  //             ">${mapEvent.title}</div>
  //             <div class="center" style="
  //               font-size: 13px;
  //               height: 18px;
  //               ${theme.typeFace.caption['13R']};
  //               text-overflow: ellipsis;
  //               overflow: hidden;
  //               white-space: nowrap;
  //             ">${mapEvent.center}</div>
  //           </div>
  //         </div>
  //       `;
  //       newMarker.setIcon({
  //         content: markerContent,
  //         size: new naver.maps.Size(196, 72),
  //         origin: new naver.maps.Point(0, 0),
  //         anchor: new naver.maps.Point(98, 36),
  //       });
  //     }

  //     // 지도 중심 변경
  //     mapInstance?.setCenter(
  //       new naver.maps.LatLng(mapEvent.latitude, mapEvent.longitude),
  //     );
  //     mapInstance?.setZoom(18);
  //   },
  //   [markers, selectedEvent, setSelectedEvent],
  // );

  // sortedEvents 변경시 마커 업데이트 - 필터링
  useEffect(() => {
    if (!mapInstance || !sortedEvents || activeFilterCount === 0) return;

    // 기존 말풍선 유지하면서 새로운 이벤트에 대해 흰색 말풍선 추가
    sortedEvents.forEach((event) => {
      if (balloonMarkers.has(event.eventId)) return; // 기존 말풍선 유지

      const balloonMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(event.latitude, event.longitude),
        map: mapInstance as naver.maps.Map,
        icon: {
          content: `
            <div class="balloon-marker" style="
              position: relative;
              width: 128px;
              height: 44px;
              border-radius: 8px;
              background: white;
              color: black;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
              box-shadow: 0px 2px 6px rgba(0,0,0,0.2);
            ">
              ${event.title}
            </div>
          `,
          size: new naver.maps.Size(128, 44),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(64, 22),
        },
      });

      balloonMarkers.set(event.eventId, balloonMarker);
    });
  }, [sortedEvents, activeFilterCount, balloonMarkers]);

  // 클릭시 흰색 <-> 검정 말풍선 토글
  const handleMarkerClick = useCallback(
    (mapEvent: EventData) => {
      const balloonMarker = balloonMarkers.get(mapEvent.eventId);

      if (balloonMarker) {
        const icon = balloonMarker.getIcon();
        // HtmlIcon인지 확인
        if (
          typeof icon === 'object' &&
          'content' in icon &&
          typeof icon.content === 'string'
        ) {
          const isBlack = icon.content.includes('background: black');

          setSelectedEvent(mapEvent); // 새 이벤트 선택

          balloonMarker.setIcon({
            content: `
            <div class="balloon-marker" style="
              position: relative;
              width: 160px;
              height: 50px;
              border-radius: 8px;
              background: ${isBlack ? 'white' : 'black'};
              color: ${isBlack ? 'black' : 'white'};
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: bold;
              box-shadow: 0px 2px 6px rgba(0,0,0,0.2);
            ">
              ${mapEvent.title}
            </div>
          `,
            size: new naver.maps.Size(160, 50),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(80, 25),
          });

          // 지도 중심 변경
          mapInstance?.setCenter(
            new naver.maps.LatLng(mapEvent.latitude, mapEvent.longitude),
          );
          mapInstance?.setZoom(18);
        }
      }
    },
    [balloonMarkers, setSelectedEvent],
  );

  const initMap = useCallback(
    (centerLat: number, centerLng: number) => {
      const mapDiv = document.getElementById('map');
      if (!mapDiv || mapInstance) return;
      mapInstance = new naver.maps.Map(mapDiv, {
        center: new naver.maps.LatLng(centerLat, centerLng),
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT,
        },
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
      markers.set(0n, myLocMarker); // 내 위치

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

  // 사용자 위치 성공적으로 알아냈을때
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

  // 내 위치로 이동
  const handleMyLocationClick = useCallback(() => {
    if (myLocation) {
      mapInstance?.setCenter(
        new naver.maps.LatLng(myLocation.lat(), myLocation.lng()),
      );
      mapInstance?.setZoom(15);
    } else {
      showLocationConfirm(); // myLocation 없으면 위치 동의 띄우기
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
        <SquareButton icon="myLocation" onClick={handleMyLocationClick} />
        <RoundedButton
          icon="menu"
          text="목록 보기"
          onClick={handleGotoListBtnClick}
        />
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <EventCard id={selectedEvent.eventId as bigint} />
          </motion.div>
        )}
      </S.BottomContainer>
    </S.MapContainer>
  );
};

export default EventMap;
