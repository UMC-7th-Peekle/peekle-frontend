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
} from '@/components';
import { useMapStore, useMyLocationStore } from '@/stores';
import { confirm, getCurrentPosition } from '@/utils';
import { ROUTES } from '@/constants/routes';
import { useEventFilter, useMapMarkers } from '@/hooks';

window.navermap_authFailure = function () {
  console.error('네이버 지도 인증 실패');
  throw new Error('네이버 지도 인증 실패');
};

const EventMap = ({ onMapLoad }: { onMapLoad: () => void }) => {
  // localStorage.clear();
  // sessionStorage.clear();
  const [mapInstance, setMapInstance] = useState<naver.maps.Map>();
  const [searchQuery] = useQueryState('event-search', { defaultValue: '' });

  const {
    selectedEvent,
    setSelectedEvent,
    setIsLoading,
    setLoadingMessage,
    // setLatestPos,
    latestPos,
  } = useMapStore();
  const { myLocation, setMyLocation } = useMyLocationStore();
  const { sortedEvents } = useEventFilter();
  const {
    markers,
    blackSBMarker,
    createBlackMarker,
    createMarkers,
    updateMarkers,
    removeBlackSBMarker,
  } = useMapMarkers(mapInstance, sortedEvents);

  const navigate = useNavigate();
  const location = useLocation();

  const initMap = useCallback(
    (centerLat: number, centerLng: number) => {
      const mapDiv = document.getElementById('map');
      if (!mapDiv) return;

      // latestPos가 있으면 그 위치를 사용
      const latLng = latestPos ?? new naver.maps.LatLng(centerLat, centerLng);

      if (!mapInstance) {
        const newMap = new naver.maps.Map(mapDiv, {
          // center: new naver.maps.LatLng(centerLat, centerLng),
          center: latLng,
          zoom: 15,
          minZoom: 10,
          disableKineticPan: false,
        });

        setMapInstance(newMap);

        // 맵이 완전히 로드되었을 때
        naver.maps.Event.addListener(newMap, 'init', () => {
          onMapLoad();
        });
      } else {
        // mapInstance.setCenter(new naver.maps.LatLng(centerLat, centerLng));
        mapInstance.setCenter(latLng);
        mapInstance.setZoom(15);
      }
      createMarkers(centerLat, centerLng);
      // selectedEvent가 있을 땐 해당 검정 말풍선 열기
      if (selectedEvent) {
        const marker = markers.get(selectedEvent.eventId);
        if (marker) {
          console.log('blackSBMarker:', blackSBMarker);
          if (!blackSBMarker) {
            createBlackMarker(
              new naver.maps.LatLng(
                selectedEvent.latitude,
                selectedEvent.longitude,
              ),
              selectedEvent,
            );
          }
        }
      }
    },
    [
      mapInstance,
      createMarkers,
      onMapLoad,
      latestPos,
      selectedEvent,
      markers,
      blackSBMarker,
      createBlackMarker,
    ],
  );

  // 지도 움직임
  const idleHandler = useCallback(() => {
    updateMarkers();
  }, [updateMarkers]);

  const mapClickHandler = useCallback(() => {
    // 선택된 infowindow 기본 색으로 변경
    if (selectedEvent) {
      console.log('selectedEvent:', selectedEvent);
      setSelectedEvent(null);
      removeBlackSBMarker();
    }
  }, [selectedEvent, setSelectedEvent, removeBlackSBMarker]);

  // 이벤트 리스너 등록
  useEffect(() => {
    if (!mapInstance) return;

    const MapClickListner = naver.maps.Event.addListener(
      mapInstance,
      'click',
      mapClickHandler,
    );

    const MoveEventListner = naver.maps.Event.addListener(
      mapInstance,
      'idle', // 지도 움직임 끝났을때
      idleHandler,
    );
    return () => {
      naver.maps.Event.removeListener(MapClickListner);
      naver.maps.Event.removeListener(MoveEventListner);
    };
  }, [idleHandler, mapClickHandler, mapInstance]);

  // 위치 동의 성공
  const handleLocationSuccess = useCallback(
    async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setMyLocation(new naver.maps.LatLng(latitude, longitude));
      initMap(latitude, longitude);
    },
    [initMap, setMyLocation],
  );

  // 위치 동의 확인
  const showLocationConfirm = useCallback(() => {
    confirm(
      <LocationConfirm
        onLocationAllow={() => {
          localStorage.setItem('curr-location-agree', 'true');
          setIsLoading(true);
          setLoadingMessage('위치 정보를 가져오는 중이에요...');
          getCurrentPosition()
            .then(handleLocationSuccess)
            .finally(() => {
              setIsLoading(false);
              setLoadingMessage('');
            });
        }}
        onLocationDeny={() => {
          localStorage.setItem('curr-location-agree', 'false');
          initMap(
            import.meta.env.VITE_MAP_CENTER_LAT,
            import.meta.env.VITE_MAP_CENTER_LNG,
          );
          setIsLoading(false);
          setLoadingMessage('');
        }}
      />,
    );
  }, [handleLocationSuccess, setIsLoading, setLoadingMessage, initMap]);

  useEffect(() => {
    const locationAgreed = localStorage.getItem('curr-location-agree');
    if (locationAgreed === null) {
      showLocationConfirm();
    } else {
      setIsLoading(true);
      setLoadingMessage('위치 정보를 가져오는 중이에요...');
      const mapDiv = document.getElementById('map');
      if (mapDiv) {
        if (myLocation) initMap(myLocation.y, myLocation.x);
        else {
          console.log(
            import.meta.env.VITE_MAP_CENTER_LAT,
            import.meta.env.VITE_MAP_CENTER_LNG,
          );
          initMap(
            import.meta.env.VITE_MAP_CENTER_LAT,
            import.meta.env.VITE_MAP_CENTER_LNG,
          );
        }
        setIsLoading(false);
        setLoadingMessage('');
      } else {
        // MutationObserver 설정
        const observer = new MutationObserver(() => {
          const newMapDiv = document.getElementById('map');
          if (newMapDiv) {
            observer.disconnect(); // 요소를 찾으면 감지 중단
            if (myLocation) initMap(myLocation.y, myLocation.x);
            else {
              console.log(
                import.meta.env.VITE_MAP_CENTER_LAT,
                import.meta.env.VITE_MAP_CENTER_LNG,
              );
              initMap(
                import.meta.env.VITE_MAP_CENTER_LAT,
                import.meta.env.VITE_MAP_CENTER_LNG,
              );
            }
          }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        setIsLoading(false);
        setLoadingMessage('');
        return () => {
          observer.disconnect();
        }; // 컴포넌트 언마운트 시 정리
      }
    }
    return undefined;
  }, [
    handleLocationSuccess,
    showLocationConfirm,
    initMap,
    myLocation,
    setIsLoading,
    setLoadingMessage,
    mapInstance,
  ]);

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

  return (
    <S.MapContainer id="mapContainer">
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
