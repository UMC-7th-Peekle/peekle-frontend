import * as S from './style';
import { useEffect, useCallback, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  EventCard,
  ShowLocationConfirm,
  SquareButton,
  RoundedButton,
  SearchBottomSheet,
} from '@/components';
import {
  useMapStore,
  useMyLocationStore,
  useSearchBottomSheetStore,
  useEventsStore,
} from '@/stores';
import { getCurrentPosition, alert } from '@/utils';
import { ROUTES } from '@/constants/routes';
import { useGetEvents, useMapMarkers, useEventFilter } from '@/hooks';
import queryClient from '@/lib/tanstack-query/queryClient';
window.navermap_authFailure = function () {
  console.error('네이버 지도 인증 실패');
  throw new Error('네이버 지도 인증 실패');
};

const EventMap = ({
  onMapLoad,
  isSearchPage = false,
}: {
  onMapLoad: () => void;
  isSearchPage?: boolean;
}) => {
  // localStorage.clear();
  // sessionStorage.clear();
  const [mapInstance, setMapInstance] = useState<naver.maps.Map>();
  const [isMapInitialed, setIsMapInitialed] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('event-search') ?? '';

  const { events } = useEventsStore();
  const { formattedFilters } = useEventFilter();

  // 지도 영역
  const [bounds, setBounds] = useState({
    southWest: '',
    northEast: '',
  });

  const { data: eventsData, isFetching: isEventsFetching } = useGetEvents({
    ...formattedFilters,
    limit: 200, // 지도에 표시할 이벤트 수
    southWest: bounds.southWest || undefined, // 빈 문자열이면 무시
    northEast: bounds.northEast || undefined,
  });

  const { createMarkers, updateMarkers, removeBlackSBMarker, updateLatestPos } =
    useMapMarkers(
      mapInstance,
      isSearchPage ? events : (eventsData?.pages[0].success?.events ?? []),
    );

  const { setIsSearchBSOpen } = useSearchBottomSheetStore();

  // 마지막 API 호출 시간을 추적
  const lastApiCallTimeRef = useRef<number>(Date.now());

  const {
    selectedEvent,
    setSelectedEvent,
    isLoading,
    setIsLoading,
    setLoadingMessage,
    latestPos,
    setLatestPos,
  } = useMapStore();
  const {
    myLocation,
    setMyLocation,
    hasMyLocationChanged,
    resetMyLocationChanged,
  } = useMyLocationStore();

  // 이전 위치 저장
  const latestPosRef = useRef(latestPos);

  const navigate = useNavigate();

  console.log('events in map', events);

  const initMap = useCallback(
    (centerLat: number, centerLng: number) => {
      const mapDiv = document.getElementById('map');
      if (!mapDiv) return;

      updateLatestPos();
      let latLng = null;

      // 내 위치 바뀌면 센터로 이동
      if (hasMyLocationChanged) {
        latLng = new naver.maps.LatLng(centerLat, centerLng);
        resetMyLocationChanged();
      }
      // 맵 초기화돼있으면 latestPos 사용
      if (isMapInitialed && latestPos) latLng = latestPos;
      else latLng = new naver.maps.LatLng(centerLat, centerLng);

      setIsMapInitialed(true);

      if (!mapInstance) {
        const newMap = new naver.maps.Map(mapDiv, {
          center: latLng,
          zoom: 15,
          minZoom: 10,
          disableKineticPan: false,
        });

        setMapInstance(newMap);
      } else {
        // mapInstance 있으면
        mapInstance.setCenter(latLng);
      }

      createMarkers(centerLat, centerLng);
    },
    [
      mapInstance,
      updateLatestPos,
      latestPos,
      createMarkers,
      hasMyLocationChanged,
      resetMyLocationChanged,
      isMapInitialed,
    ],
  );

  // 지도 움직임
  const idleHandler = useCallback(() => {
    if (!mapInstance) return;

    updateMarkers();

    // 지도 영역 (mapBounds) 변경 시 - searchPage에선 사용 x
    if (!isSearchPage) {
      // 마지막 API 호출 시간 추적
      const now = Date.now();
      const timeDifference = now - lastApiCallTimeRef.current;

      if (timeDifference > 500) {
        // 500ms 이상 지났으면 api 호출
        lastApiCallTimeRef.current = now;

        const bounds = mapInstance?.getBounds();
        if (bounds) {
          const southWest = {
            lat: bounds.minX(),
            lng: bounds.minY(),
          };
          const northEast = {
            lat: bounds.maxX(),
            lng: bounds.maxY(),
          };

          setBounds({
            southWest: `${southWest.lat}, ${southWest.lng}`,
            northEast: `${northEast.lat}, ${northEast.lng}`,
          });

          queryClient.invalidateQueries({
            queryKey: ['events'],
            refetch: true,
          });
          queryClient.setQueryData(['events'], {
            ...formattedFilters,
            southWest: `${southWest.lat},${southWest.lng}`,
            northEast: `${northEast.lat},${northEast.lng}`,
          });
        }
      }
    }
    if (!isEventsFetching) onMapLoad();

    // 움직임 멈추고 latestPos 업데이트 해두기
    const center = mapInstance?.getCenter();
    if (center) {
      const centerLatLng = new naver.maps.LatLng(center.y, center.x);
      if (latestPosRef.current !== centerLatLng) {
        latestPosRef.current = centerLatLng;
        setLatestPos(centerLatLng);
      }
    }
  }, [
    updateMarkers,
    formattedFilters,
    mapInstance,
    isSearchPage,
    isEventsFetching,
    onMapLoad,
    setLatestPos,
  ]);

  const mapClickHandler = useCallback(() => {
    // 지도 부분 클릭시 선택된 infowindow 기본 색으로 변경
    if (selectedEvent) {
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
  const handleLocationConfirm = useCallback(() => {
    ShowLocationConfirm(
      () => {
        localStorage.setItem('curr-location-agree', 'true');
        setIsLoading(true);
        setLoadingMessage('위치 정보를 가져오는 중이에요...');
        getCurrentPosition()
          .then(handleLocationSuccess)
          .finally(() => {
            setIsLoading(false);
            setLoadingMessage('');
          });
      },
      () => {
        localStorage.setItem('curr-location-agree', 'false');
        initMap(
          import.meta.env.VITE_MAP_CENTER_LAT,
          import.meta.env.VITE_MAP_CENTER_LNG,
        );
        setIsLoading(false);
        setLoadingMessage('');
      },
    );
  }, [handleLocationSuccess, setIsLoading, setLoadingMessage, initMap]);

  useEffect(() => {
    const locationAgreed = localStorage.getItem('curr-location-agree');
    if (locationAgreed === null) {
      handleLocationConfirm();
    } else {
      if (!isLoading) {
        setIsLoading(true);
        setLoadingMessage('위치 정보를 가져오는 중이에요...');
      }
      const mapDiv = document.getElementById('map');
      if (mapDiv) {
        if (myLocation) initMap(myLocation.y, myLocation.x);
        else {
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
    handleLocationConfirm,
    initMap,
    myLocation,
    isLoading,
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
      handleLocationConfirm(); // 위치 동의 띄우기
    }
  }, [mapInstance, myLocation, handleLocationConfirm]);

  const handleGotoListBtnClick = () => {
    // 검색어가 한 글자밖에 없으면 alert 띄우기
    if (searchQuery.length === 1)
      alert('두 글자 이상 입력해주세요.', 'none', '확인');
    // 검색 페이지가 아니면 페이지 이동
    else if (!isSearchPage) {
      // 검색어 삭제 후 쿼리 재호충
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('event-search');
      setSearchParams(newSearchParams);
      navigate({
        pathname: ROUTES.EVENT,
        search: newSearchParams.toString(), // 현재 쿼리 파람 유지
      });
    }
    // 검색 페이지이면 검색 바텀시트 활성화
    else {
      setIsSearchBSOpen(true);
    }
  };

  const hasSelectedEvent = selectedEvent !== null;

  return (
    <>
      <S.MapContainer $isSearchPage={isSearchPage}>
        <S.Map id="map" />
        <S.BottomContainer
          $isSearchPage={isSearchPage}
          $hasSelectedEvent={hasSelectedEvent}
        >
          <S.ButtonContainer>
            <SquareButton icon="myLocation" onClick={handleMyLocationClick} />
            <RoundedButton
              icon="menu"
              text="목록 보기"
              onClick={handleGotoListBtnClick}
            />
          </S.ButtonContainer>
          {selectedEvent && (
            <AnimatePresence>
              <motion.div
                key={selectedEvent.eventId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <S.EventCardWrapper>
                  <EventCard
                    id={selectedEvent.eventId}
                    eventCardData={selectedEvent}
                  />
                </S.EventCardWrapper>
              </motion.div>
            </AnimatePresence>
          )}
        </S.BottomContainer>
      </S.MapContainer>
      {isSearchPage && !selectedEvent && <SearchBottomSheet />}
    </>
  );
};

export default EventMap;
