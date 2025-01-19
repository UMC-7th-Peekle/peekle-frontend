import * as S from './style';
import { useState, useEffect, useCallback } from 'react';
import { BottomSheet, LocationConfirm, EventList, Selects } from '@/components';
import { useBottomSheetStore } from '@/stores';
import { confirm } from '@/utils';
import { BOTTOM_SHEET_ID_EVENT_INFO, MAP_MARKERS } from '@/constants/event';
import { events } from '@/sample-data/event';

window.navermap_authFailure = function () {
  console.error('네이버 지도 인증 실패');
  // throw new Error('네이버 지도 인증 실패'); // ErrorFallback 개발 후 에러 바운더리로 던지기
};

// 마커 아이콘 가져오기
const getMarkerIcon = (category: string) => {
  return MAP_MARKERS[category as keyof typeof MAP_MARKERS];
};

let mapInstance: naver.maps.Map | null = null;

const EventMapPage = () => {
  const { setActiveBottomSheet } = useBottomSheetStore();
  const [isLoading, setIsLoading] = useState(true);
  const [myLocation, setMyLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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

      new naver.maps.Marker({
        position: new naver.maps.LatLng(centerLat, centerLng),
        map: mapInstance,
        icon: {
          url: getMarkerIcon('my_location'),
          size: new naver.maps.Size(36, 36),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(18, 18),
        },
      });

      // 이벤트 마커들
      events.forEach((event) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(event.latitude, event.longitude),
          map: mapInstance as naver.maps.Map,
          icon: {
            url: getMarkerIcon(event.category),
            size: new naver.maps.Size(36, 36),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(18, 18),
          },
        });

        // 이벤트 마커 클릭 이벤트
        naver.maps.Event.addListener(marker, 'click', () => {
          mapInstance?.setCenter(
            new naver.maps.LatLng(event.latitude, event.longitude),
          );
          mapInstance?.setZoom(15);
          setActiveBottomSheet(BOTTOM_SHEET_ID_EVENT_INFO);
        });
      });
    },
    [setActiveBottomSheet],
  );

  const getCurrentPosition = useCallback(() => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation 지원하지 않는 브라우저'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => {
          setIsLoading(false);
          reject(new Error(`Geolocation 에러: ${error.message}`));
        },
      );
    });
  }, []);

  const handleLocationSuccess = useCallback(
    async (position: GeolocationPosition) => {
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setMyLocation(newLocation);
      initMap(newLocation.latitude, newLocation.longitude);
      setIsLoading(false);
    },
    [initMap],
  );

  const showLocationConfirm = useCallback(() => {
    confirm(
      <LocationConfirm
        onLocationAllow={async () => {
          try {
            const position = await getCurrentPosition();
            await handleLocationSuccess(position);
            sessionStorage.setItem('curr-location-agree', 'true');
          } catch (error) {
            console.error('위치 정보를 가져오는데 실패했습니다:', error);
          }
        }}
      />,
    );
  }, [getCurrentPosition, handleLocationSuccess]);

  useEffect(() => {
    const locationAgreed = sessionStorage.getItem('curr-location-agree');

    if (locationAgreed === null) {
      showLocationConfirm();
    } else if (locationAgreed === 'true') {
      getCurrentPosition().then(handleLocationSuccess);
    }
  }, [getCurrentPosition, handleLocationSuccess, showLocationConfirm]);

  // 내 위치로 이동
  const handleMyLocationClick = useCallback(() => {
    if (myLocation) {
      mapInstance?.setCenter(
        new naver.maps.LatLng(myLocation.latitude, myLocation.longitude),
      );
      mapInstance?.setZoom(15);
    } else {
      showLocationConfirm(); // 위치 동의 띄우기
    }
  }, [myLocation, showLocationConfirm]);

  return (
    <S.Container>
      <Selects />
      {isLoading ? <p>로딩 중...</p> : <S.Map id="map" />}
      <S.MyLocationIcon onClick={handleMyLocationClick} />
      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_INFO}>
        <EventList />
      </BottomSheet>
    </S.Container>
  );
};

export default EventMapPage;
