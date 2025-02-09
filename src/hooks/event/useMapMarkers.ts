import { useRef, useCallback } from 'react';
import { EventData } from '@/types/event';
import { theme } from '@/styles/theme';
import { getMarker } from '@/utils';
import { useMapStore } from '@/stores';

const useMapMarkers = (
  mapInstance: naver.maps.Map | undefined,
  events: EventData[],
) => {
  const markersRef = useRef<Map<bigint, naver.maps.Marker>>(new Map());
  const whiteSBMarkersRef = useRef<Map<bigint, naver.maps.Marker>>(new Map());
  const blackSBMarkerRef = useRef<naver.maps.Marker | null>(null); // 단일 마커 참조
  const { setSelectedEvent, setLatestPos } = useMapStore();

  // 검정 마커 생성 함수
  const createBlackMarker = useCallback(
    (position: naver.maps.LatLng, event: EventData) => {
      if (mapInstance) {
        // 기존 검정 마커가 있으면 제거
        if (blackSBMarkerRef.current) {
          blackSBMarkerRef.current.setMap(null);
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
        blackSBMarkerRef.current = blackSBMarker;
        blackSBMarker.setMap(mapInstance); // 비로 지도에 표시
      }
    },
    [mapInstance],
  );

  // 흰색 마커 생성 함수
  const createWhiteMarker = useCallback(
    (position: naver.maps.LatLng, event: EventData) => {
      if (mapInstance) {
        const whiteSBMarker = new naver.maps.Marker({
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
        whiteSBMarkersRef.current.set(event.eventId, whiteSBMarker);
      }
    },
    [mapInstance],
  );

  // 마커 클릭 이벤트
  const handleMarkerClick = useCallback(
    (mapEvent: EventData) => {
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
      console.log('mapEvent:', mapEvent);
      createBlackMarker(position, mapEvent);
      // console.log('after sbMarker', sbMarkersRef.current.get(mapEvent.eventId));

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

      // 기존 마커 삭제
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current.clear();
      whiteSBMarkersRef.current.forEach((sbMarker) => sbMarker.setMap(null));
      whiteSBMarkersRef.current.clear();

      // 마커 생성
      const myLocMarker = new naver.maps.Marker({
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

      events.forEach((event) => {
        const position = new naver.maps.LatLng(event.latitude, event.longitude);
        const marker = new naver.maps.Marker({
          position,
          map: mapInstance,
          icon: {
            content: getMarker(event.categoryId),
            size: new naver.maps.Size(36, 36),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(18, 18),
          },
        });

        markersRef.current.set(event.eventId, marker);

        createWhiteMarker(position, event);

        // 마커 클릭 이벤트 추가
        naver.maps.Event.addListener(marker, 'click', () =>
          handleMarkerClick(event),
        );
      });
    },
    [markersRef, mapInstance, events, handleMarkerClick, createWhiteMarker],
  );

  const updateMarkers = useCallback(() => {
    if (!mapInstance) return;

    // 현재 지도의 화면 영역을 mapBounds 변수에 저장
    const mapBounds = mapInstance.getBounds();

    // const projection = mapInstance.getProjection();
    // const center = mapInstance.getCenter();

    Array.from(markersRef.current.entries()).forEach(([key, marker]) => {
      const position = marker.getPosition();
      // const distance = projection.getDistance(center, position);
      const whiteSBMarker = whiteSBMarkersRef.current.get(key);
      if (mapBounds.hasPoint(position)) {
        // 마커가 화면에 보이면 표시
        marker.setMap(mapInstance);
        // if (distance <= 500) // 500m 이내에서만
        whiteSBMarker?.setMap(mapInstance);
      } else {
        // 화면 밖이면 숨김
        marker.setMap(null);
        whiteSBMarker?.setMap(null);
      }
    });
  }, [mapInstance]);

  const removeBlackSBMarker = useCallback(() => {
    if (blackSBMarkerRef.current) {
      blackSBMarkerRef.current.setMap(null);
      blackSBMarkerRef.current = null;
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
