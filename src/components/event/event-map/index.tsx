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
import { useMapStore, useMyLocationStore } from '@/stores';
import { confirm, getMarker, getCurrentPosition } from '@/utils';
import { ROUTES } from '@/constants/routes';
import { useEventFilter, useMapEventMarkers } from '@/hooks';

window.navermap_authFailure = function () {
  console.error('네이버 지도 인증 실패');
  throw new Error('네이버 지도 인증 실패');
};

const EventMap = () => {
  // localStorage.clear();
  const [mapInstance, setMapInstance] = useState<naver.maps.Map>();
  const [searchQuery] = useQueryState('event-search', { defaultValue: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { selectedEvent } = useMapStore();
  const { myLocation, setMyLocation } = useMyLocationStore();
  const { sortedEvents } = useEventFilter();
  const { markers, createMarkers, updateMarkers } = useMapEventMarkers(
    mapInstance,
    sortedEvents,
  );

  const navigate = useNavigate();
  const location = useLocation();

  const initMap = useCallback(
    (centerLat: number, centerLng: number) => {
      const mapDiv = document.getElementById('map');
      if (!mapDiv) return;
      if (!mapInstance) {
        const newMap = new naver.maps.Map(mapDiv, {
          center: new naver.maps.LatLng(centerLat, centerLng),
          zoom: 15,
          minZoom: 10,
          disableKineticPan: false,
        });

        setMapInstance(newMap);
      } else {
        mapInstance.setCenter(new naver.maps.LatLng(centerLat, centerLng));
        mapInstance.setZoom(15);
      }

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

      // 이벤트 마커 생성
      createMarkers();
    },
    [mapInstance, createMarkers, markers],
  );

  // console.log('sortedEvents', sortedEvents);
  // useEffect(() => {
  //   if (!mapInstance || !sortedEvents) return;

  //   // 기존 마커 제거
  //   markers.forEach((marker, key) => {
  //     if (key !== 0n) {
  //       marker.setMap(null); // 'my_location' 마커는 건드리지 않음
  //     }
  //   });
  //   markers.clear();

  //   // 새로운 마커 생성
  //   sortedEvents.forEach((event) => {
  //     const marker = new naver.maps.Marker({
  //       position: new naver.maps.LatLng(event.latitude, event.longitude),
  //       map: mapInstance,
  //       icon: {
  //         content: getMarker(event.category.name),
  //         size: new naver.maps.Size(36, 36),
  //         origin: new naver.maps.Point(0, 0),
  //         anchor: new naver.maps.Point(18, 18),
  //       },
  //     });

  //     // 마커 이벤트 등록
  //     naver.maps.Event.addListener(marker, 'click', () =>
  //       handleMarkerClick(event),
  //     );
  //     markers.set(event.eventId, marker);
  //   });
  // }, [sortedEvents, handleMarkerClick, markers, updateMarkers]);

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
  }, [idleHandler, mapInstance]);

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
      if (myLocation) {
        console.log('initMap 호출');
        initMap(myLocation.y, myLocation.x);
        setIsLoading(false);
        return;
      }
      getCurrentPosition().then(handleLocationSuccess);
    }
  }, [handleLocationSuccess, showLocationConfirm, initMap, myLocation]);

  // 내 위치로 이동
  const handleMyLocationClick = useCallback(() => {
    if (myLocation) {
      mapInstance?.setCenter(new naver.maps.LatLng(myLocation.y, myLocation.x));
      mapInstance?.setZoom(15);
    } else {
      showLocationConfirm(); // 위치 동의 띄우기
    }
  }, [mapInstance, myLocation, showLocationConfirm]);

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
              <EventCard id={selectedEvent.eventId} />
            </S.EventCardWrapper>
          </motion.div>
        )}
      </S.BottomContainer>
    </S.MapContainer>
  );
};

export default EventMap;
