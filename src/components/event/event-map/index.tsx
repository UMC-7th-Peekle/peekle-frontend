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
import { theme } from '@/styles/theme';

window.navermap_authFailure = function () {
  console.error('네이버 지도 인증 실패');
  throw new Error('네이버 지도 인증 실패');
};

let mapInstance: naver.maps.Map;

const EventMap = () => {
  // localStorage.clear();
  const { selectedEvent, setSelectedEvent } = useMapStore();
  const { myLocation, setMyLocation } = useMyLocationStore();
  const { sortedEvents } = useEventFilter();
  const [markers] = useState<Map<bigint, naver.maps.Marker>>(
    new Map<bigint, naver.maps.Marker>(),
  );
  const [infoWindows] = useState<Map<bigint, naver.maps.InfoWindow>>(
    new Map<bigint, naver.maps.InfoWindow>(),
  );
  const [searchQuery] = useQueryState('event-search', { defaultValue: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 마커 클릭 이벤트
  const handleMarkerClick = useCallback(
    (mapEvent: EventData) => {
      setSelectedEvent(mapEvent);
      const marker = markers.get(mapEvent.eventId);
      const infoWindow = infoWindows.get(mapEvent.eventId);
      if (!marker || !infoWindow) return;

      if (infoWindow.getMap()) {
        // InfoWindow가 열려 있다면 닫기
        infoWindow.close();
      } else {
        // InfoWindow가 닫혀 있다면 열기
        infoWindow.open(mapInstance, marker);
      }

      // 지도 이동 및 확대
      mapInstance?.morph(
        new naver.maps.LatLng(mapEvent.latitude, mapEvent.longitude),
        20,
        { duration: 0, easing: 'easeOutCubic' }, // 500ms 고정
      );
      mapInstance?.setZoom(19);
    },
    [setSelectedEvent, markers, infoWindows],
  );

  const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
    // 지도에 표시되어있는지 확인
    if (marker.getMap()) return;
    // 표시되어있지 않다면 오버레이를 지도에 추가
    marker.setMap(map);
  };

  const hideMarker = (marker: naver.maps.Marker) => {
    // 지도에 표시되어있는지 확인
    if (!marker.getMap()) return;
    // 표시되어있다면 오버레이를 지도에서 삭제
    marker.setMap(null);
  };

  const updateMarkers = useCallback(() => {
    if (!mapInstance) return;

    // 현재 지도의 화면 영역을 mapBounds 변수에 저장
    const mapBounds = mapInstance.getBounds();

    // 마커 객체 배열을 순회하며 각 마커의 위치를 position 변수에 저장
    markers.forEach((marker) => {
      const position = marker.getPosition();

      if (mapBounds.hasPoint(position)) {
        // 마커가 화면에 보이면 표시
        showMarker(mapInstance, marker);
      } else {
        // 화면 밖이면 숨김
        hideMarker(marker);
      }
    });
  }, [markers]);

  const initMap = useCallback(
    (centerLat: number, centerLng: number) => {
      const mapDiv = document.getElementById('map');
      if (!mapDiv) return;
      console.log(mapInstance);
      if (!mapInstance) {
        mapInstance = new naver.maps.Map(mapDiv, {
          center: new naver.maps.LatLng(centerLat, centerLng),
          zoom: 15, //지도의 초기 줌 레벨
          minZoom: 10,
          disableKineticPan: false, // 관성 드래깅
        });
      }
      // 기존 mapInstance가 있으면 재사용
      mapInstance.setCenter(new naver.maps.LatLng(centerLat, centerLng));
      mapInstance.setZoom(15);

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

        // InfoWindow
        const InfoWindowContent = document.createElement('div');
        InfoWindowContent.innerHTML = `
          <div class="select-speech-bubble" style="position: relative;">
            <div class="selected-content" style="
              position: absolute;
              top: -40px;
              right: 50%;
              transform: translateX(50%);
              border-radius: ${theme.borderRadius.sm};
              color: ${theme.color.gray[0]};
              background: ${theme.color.gray[900]};
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 7px 10px;
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            ">
              <div class="title" style="
                max-width: 200px;
                ${theme.typeFace.body['15B']};
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              ">${event.title}</div>
            </div>
            <div class="speech-bubble-tail" style="
              position: absolute;
              bottom: -5px;
              left: 50%;
              transform: translateX(-50%);
              width: 16px;
              height: 10px;
              background: ${theme.color.gray[900]};
              clip-path: polygon(0 0, 100% 0, 50% 100%);
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            "/>
          </div>
        `;
        const infowindow = new naver.maps.InfoWindow({
          content: InfoWindowContent,
          // 기본 설정 무시
          borderWidth: 0,
          disableAnchor: true,
          backgroundColor: 'transparent',
          // 위치
          pixelOffset: new naver.maps.Point(0, -35),
        });
        infoWindows.set(event.eventId, infowindow);

        // 이벤트 마커 클릭 이벤트
        naver.maps.Event.addListener(marker, 'click', () =>
          handleMarkerClick(event),
        );
      });
    },
    [handleMarkerClick, markers, sortedEvents, infoWindows],
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
        map: mapInstance,
        icon: {
          content: getMarker(event.category.name),
          size: new naver.maps.Size(36, 36),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(18, 18),
        },
      });

      // 마커 이벤트 등록
      naver.maps.Event.addListener(marker, 'click', () =>
        handleMarkerClick(event),
      );
      markers.set(event.eventId, marker);
    });
  }, [sortedEvents, handleMarkerClick, markers, updateMarkers]);

  // 지도 움직임
  const idleHandler = useCallback(() => {
    updateMarkers();
  }, [updateMarkers]);

  useEffect(() => {
    if (!mapInstance) return;

    const MoveEventListner = naver.maps.Event.addListener(
      mapInstance,
      'idle',
      idleHandler,
    );
    return () => {
      naver.maps.Event.removeListener(MoveEventListner);
    };
  }, [idleHandler]);

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
          setIsLoading(true); // 위치 요청 시작 시 로딩 시작
          await getCurrentPosition().then(handleLocationSuccess);
          localStorage.setItem('curr-location-agree', 'true');
          setIsLoading(false);
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
      console.log('locationAgreed');
      if (myLocation) {
        console.log('myLocation 있음', myLocation.y, myLocation.x);
        initMap(myLocation.y, myLocation.x);
      }
      getCurrentPosition().then(handleLocationSuccess);
      setIsLoading(false); // 세션 스토리지 값 쓰기
    }
  }, [handleLocationSuccess, showLocationConfirm, initMap, myLocation]);

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
