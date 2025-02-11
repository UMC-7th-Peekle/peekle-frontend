import { useRef, useCallback } from 'react';
import { EventData } from '@/types/event';
import { theme } from '@/styles/theme';
import { getMarker } from '@/utils';
import { useMapStore, useMyLocationStore } from '@/stores';

const useMapMarkers = (
  mapInstance: naver.maps.Map | undefined,
  events: EventData[],
) => {
  const markersRef = useRef<Map<bigint, naver.maps.Marker>>(new Map());
  const whiteSBMarkersRef = useRef<Map<bigint, naver.maps.Marker>>(new Map());
  const blackSBMarkerRef = useRef<Map<bigint, naver.maps.Marker>>(new Map());
  const { selectedEvent, setSelectedEvent, setLatestPos } = useMapStore();
  const { myLocation } = useMyLocationStore();

  // 검정 마커 생성 함수
  const createBlackMarker = useCallback(
    (position: naver.maps.LatLng, event: EventData) => {
      if (mapInstance) {
        // 기존 검정 마커가 있으면 제거
        if (blackSBMarkerRef.current) {
          blackSBMarkerRef.current.forEach((marker) => marker.setMap(null));
          blackSBMarkerRef.current.clear();
        }

        const blackSBMarker = new naver.maps.Marker({
          position,
          map: mapInstance,
          icon: {
            content: `
              <div class="select-speech-bubble" style="position: relative; z-index: 5;">
                <div class="selected-content" style="
                  position: absolute;
                  top: -40px;
                  right: 50%;
                  transform: translateX(50%);
                  border-radius: ${theme.borderRadius.sm};
                  color: ${theme.color.gray[0]};
                  background-color: ${theme.color.gray[900]};
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 7px 10px;
                  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                ">
                  <div class="title" style="
                    max-width: 300px;
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
                  background-color: ${theme.color.gray[900]};
                  clip-path: polygon(0 0, 100% 0, 50% 100%);
                  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }"/>
              </div>
            `,
            size: new naver.maps.Size(50, 50),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(2, 25),
          },
        });
        blackSBMarkerRef.current.set(event.eventId, blackSBMarker);
      }
    },
    [mapInstance],
  );

  // 마커 클릭 이벤트
  const handleMarkerClick = useCallback(
    (mapEvent: EventData) => {
      if (mapEvent.eventId === selectedEvent?.eventId) return;

      setSelectedEvent(mapEvent);
      const position = new naver.maps.LatLng(
        mapEvent.latitude,
        mapEvent.longitude,
      );
      setLatestPos(position);

      const marker = markersRef.current.get(mapEvent.eventId);
      const whiteSBMarker = whiteSBMarkersRef.current.get(mapEvent.eventId);
      if (!marker || !whiteSBMarker || !mapInstance) return;

      // 검정색 마커 표시
      createBlackMarker(position, mapEvent);

      // 지도 이동 및 확대
      // mapInstance?.morph(
      //   new naver.maps.LatLng(mapEvent.latitude, mapEvent.longitude),
      //   19,
      //   { duration: 0, easing: 'easeOutCubic' }, // duration은 500ms 고정
      // );
      mapInstance?.setCenter(position);
      mapInstance?.setZoom(15);
    },
    [
      selectedEvent,
      setSelectedEvent,
      markersRef,
      mapInstance,
      createBlackMarker,
      setLatestPos,
    ],
  );

  const createMarkers = useCallback(
    (lat: number, lng: number) => {
      if (!mapInstance) return;

      // 내 위치 마커 생성
      const IsMyLocationChanged =
        lat !== myLocation?.y || lng !== myLocation?.x;
      let myLocMarker = markersRef.current.get(0n);
      if (!myLocMarker || IsMyLocationChanged) {
        myLocMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map: mapInstance,
          icon: {
            content: getMarker(0), // 내 위치
            size: new naver.maps.Size(36, 36),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(18, 18),
          },
        });
        markersRef.current.set(0n, myLocMarker);
      }

      const currentEventIds = new Set(events.map((event) => event.eventId));

      // 불필요한 마커 제거
      markersRef.current.forEach((marker, eventId) => {
        if (eventId === 0n) return; // 내 위치 마커는 pass
        if (!currentEventIds.has(eventId)) {
          // 이벤트가 없으면 마커 제거
          marker.setMap(null);
          whiteSBMarkersRef.current.get(eventId)?.setMap(null);
          blackSBMarkerRef.current.get(eventId)?.setMap(null);
          markersRef.current.delete(eventId);
          whiteSBMarkersRef.current.delete(eventId);
          blackSBMarkerRef.current.delete(eventId);
        }
      });

      // 새로운 마커 생성
      events.forEach((event) => {
        const position = new naver.maps.LatLng(event.latitude, event.longitude);
        let marker = markersRef.current.get(event.eventId);
        if (!marker) {
          // 마커가 없으면 새로 생성
          marker = new naver.maps.Marker({
            position,
            map: mapInstance,
            icon: {
              content: getMarker(event.categoryId),
              size: new naver.maps.Size(36, 36),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(18, 18),
            },
          });
          // 마커 클릭 이벤트 추가
          naver.maps.Event.addListener(marker, 'click', () =>
            handleMarkerClick(event),
          );
        }
        markersRef.current.set(event.eventId, marker);

        // 흰색 말풍선 마커 생성
        let whiteSBMarker = whiteSBMarkersRef.current.get(event.eventId);
        if (!whiteSBMarker) {
          whiteSBMarker = new naver.maps.Marker({
            position,
            map: mapInstance,
            icon: {
              content: `
              <div class="select-speech-bubble" style="position: relative; z-index: 2;">
                <div class="selected-content" style="
                  position: absolute;
                  top: -40px;
                  right: 50%;
                  transform: translateX(50%);
                  border-radius: ${theme.borderRadius.sm};
                  color: ${theme.color.gray[900]};
                  background-color: ${theme.color.gray[0]};
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
                  background-color: ${theme.color.gray[0]};
                  clip-path: polygon(0 0, 100% 0, 50% 100%);
                  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }"/>
              </div>
            `,
              size: new naver.maps.Size(50, 50),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(2, 25),
            },
          });
          // 마커 클릭 이벤트 추가
          naver.maps.Event.addListener(whiteSBMarker, 'click', () =>
            handleMarkerClick(event),
          );
          whiteSBMarkersRef.current.set(event.eventId, whiteSBMarker);
        }
      });
    },
    [markersRef, myLocation, mapInstance, events, handleMarkerClick],
  );

  const updateMarkers = useCallback(() => {
    if (!mapInstance) return;

    // 현재 지도의 화면 영역을 mapBounds 변수에 저장
    const mapBounds = mapInstance.getBounds();

    const projection = mapInstance.getProjection();
    const center = mapInstance.getCenter();

    markersRef.current.forEach((marker, key) => {
      const position = marker.getPosition();
      const distance = projection.getDistance(center, position);
      const whiteSBMarker = whiteSBMarkersRef.current.get(key);
      const blackSBMarker = blackSBMarkerRef.current.get(key);
      if (mapBounds.hasPoint(position)) {
        // 마커가 화면에 보이면 표시
        marker.setMap(mapInstance);
        // 500m 이내에서만 표시
        if (distance <= 500) {
          whiteSBMarker?.setMap(mapInstance);
          blackSBMarker?.setMap(mapInstance);
        } else {
          whiteSBMarker?.setMap(null);
          blackSBMarker?.setMap(null);
        }
      } else {
        // 화면 밖이면 숨김
        marker.setMap(null);
        whiteSBMarker?.setMap(null);
        blackSBMarker?.setMap(null);
      }
    });
  }, [mapInstance]);

  const removeBlackSBMarker = useCallback(() => {
    if (blackSBMarkerRef.current) {
      blackSBMarkerRef.current.forEach((marker) => marker.setMap(null));
      blackSBMarkerRef.current.clear();
    }
  }, [blackSBMarkerRef]);

  return {
    markers: markersRef.current,
    whiteSBMarkers: whiteSBMarkersRef.current,
    blackSBMarker: blackSBMarkerRef.current,
    createMarkers,
    updateMarkers,
    createBlackMarker,
    removeBlackSBMarker,
  };
};

export default useMapMarkers;
