import { useRef, useCallback } from 'react';
import { EventData } from '@/types/event';
import { theme } from '@/styles/theme';
import { getMarker, formatEventTitleForSB } from '@/utils';
import { useMapStore, useMyLocationStore } from '@/stores';

const useMapMarkers = (
  mapInstance: naver.maps.Map | undefined,
  events: EventData[],
) => {
  const markersRef = useRef<Map<bigint, naver.maps.Marker>>(new Map());
  const whiteSBMarkersRef = useRef<Map<bigint, naver.maps.Marker>>(new Map());
  const blackSBMarkerRef = useRef<Map<bigint, naver.maps.Marker>>(new Map());
  const { selectedEvent, setSelectedEvent, setLatestPos } = useMapStore();
  const { hasMyLocationChanged } = useMyLocationStore();

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
              <div class="black-speech-bubble" style="position: relative; z-index: 5;">
                <div class="black-speech-bubble-svg" style={{ position: absolute; width: 100%; height: 100%;}}>
                  <svg width="224" height="42" viewBox="16 16 224 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_3325_11328)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 16C19.5817 16 16 19.5817 16 24V44.2405C16 48.6588 19.5817 52.2405 24 52.2405H121.937C122.572 52.2405 123.169 52.5423 123.546 53.0535L126.39 56.9105C127.19 57.9946 128.81 57.9946 129.61 56.9105L132.454 53.0535C132.831 52.5423 133.428 52.2405 134.063 52.2405H232C236.418 52.2405 240 48.6588 240 44.2405V24C240 19.5817 236.418 16 232 16H24Z" fill="black"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_3325_11328" x="0" y="0" width="256" height="73.7236" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="8"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3325_11328"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3325_11328" result="shape"/>
                    </filter>
                    </defs>
                  </svg>
                </div>
                <div class="title" style="
                  position: absolute;
                  top: 30%;
                  left: 50%;
                  transform: translate(-50%, -30%);
                  ${theme.typeFace.caption['14B']};
                  color: ${theme.color.gray[0]};
                  white-space: nowrap;
                ">${formatEventTitleForSB(event.title, 15)}
                </div>
              </div>
            `,
            anchor: new naver.maps.Point(115, 65),
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
      if (!mapInstance) return;
      if (mapEvent.eventId === selectedEvent?.eventId) return;

      setSelectedEvent(mapEvent);
      const position = new naver.maps.LatLng(
        mapEvent.eventLocation.coordinates[0],
        mapEvent.eventLocation.coordinates[1],
      );
      setLatestPos(position);

      const marker = markersRef.current.get(mapEvent.eventId);
      const whiteSBMarker = whiteSBMarkersRef.current.get(mapEvent.eventId);
      if (!marker || !whiteSBMarker || !mapInstance) return;

      // 검정색 마커 표시
      createBlackMarker(position, mapEvent);

      // 지도 이동 및 확대
      // mapInstance.morph(
      //   new naver.maps.LatLng(mapEvent.latitude, mapEvent.longitude),
      //   19,
      //   { duration: 0, easing: 'easeOutCubic' }, // duration은 500ms 고정
      // );
      mapInstance.setCenter(position);
      const currentZoom = mapInstance.getZoom();

      // 줌 조정: 15보다 작을 때만 변경
      if (currentZoom < 15) mapInstance.setZoom(15);
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
      let myLocMarker = markersRef.current.get(0n);
      if (!myLocMarker || hasMyLocationChanged) {
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
        const position = new naver.maps.LatLng(
          event.eventLocation.coordinates[0],
          event.eventLocation.coordinates[1],
        );
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
              <div class="white-speech-bubble" style="position: relative; z-index: 2;">
                <div class="white-speech-bubble-svg"style={{ position: absolute; width: 100%; height: 100%;}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="154" height="42" fill="none" viewBox="16 16 154 42"><g filter="url(#a)"><path fill="#fff" fill-rule="evenodd" d="M24 16a8 8 0 0 0-8 8v20a8 8 0 0 0 8 8h62.798a2 2 0 0 1 1.606.808l2.99 4.029a2 2 0 0 0 3.212 0l2.99-4.03A2 2 0 0 1 99.202 52H162a8 8 0 0 0 8-8V24a8 8 0 0 0-8-8H24Z" clip-rule="evenodd"/></g><defs><filter id="a" width="186" height="73.644" x="0" y="0" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="8"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3325_11006"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_3325_11006" result="shape"/></filter></defs></svg>
                </div>
                <div class="title" style="
                  position: absolute;
                  top: 30%;
                  left: 50%;
                  transform: translate(-50%, -30%);
                  ${theme.typeFace.caption['14B']};
                  color: ${theme.color.gray[900]};
                  white-space: nowrap;
                ">${formatEventTitleForSB(event.title, 9)}
                </div>
              </div>
            `,
              anchor: new naver.maps.Point(80, 65),
            },
          });
          // 마커 클릭 이벤트 추가
          naver.maps.Event.addListener(whiteSBMarker, 'click', () =>
            handleMarkerClick(event),
          );
          whiteSBMarkersRef.current.set(event.eventId, whiteSBMarker);
        }
      });

      // selectedEvent가 있을 땐 해당 검정 말풍선 열기
      if (selectedEvent) {
        const marker = markersRef.current.get(selectedEvent.eventId);
        if (marker) {
          if (!blackSBMarkerRef.current.get(selectedEvent.eventId)) {
            createBlackMarker(
              new naver.maps.LatLng(
                selectedEvent.eventLocation.coordinates[0],
                selectedEvent.eventLocation.coordinates[1],
              ),
              selectedEvent,
            );
          }
        }
      }
      // 마커 클러스터링
    },
    [
      markersRef,
      selectedEvent,
      hasMyLocationChanged,
      mapInstance,
      events,
      createBlackMarker,
      handleMarkerClick,
    ],
  );

  const updateMarkers = useCallback(() => {
    if (!mapInstance) return;

    // 현재 지도의 화면 영역을 mapBounds 변수에 저장
    const mapBounds = mapInstance.getBounds();

    const projection = mapInstance.getProjection();
    const center = mapInstance.getCenter();

    markersRef.current.forEach((marker, eventId) => {
      const position = marker.getPosition();
      const distance = projection.getDistance(center, position);
      const whiteSBMarker = whiteSBMarkersRef.current.get(eventId);
      const blackSBMarker = blackSBMarkerRef.current.get(eventId);
      if (mapBounds.hasPoint(position)) {
        // 마커가 화면에 보이면 표시
        marker.setMap(mapInstance);
        // 흰색 말풍선은 500m 이내에서만 표시
        if (distance <= 500) {
          whiteSBMarker?.setMap(mapInstance);
        } else {
          whiteSBMarker?.setMap(null);
        }
      } else {
        // 화면 밖이면 숨김
        marker.setMap(null);
        whiteSBMarker?.setMap(null);
        blackSBMarker?.setMap(null);
      }
    });
  }, [mapInstance]);

  const updateLatestPos = useCallback(() => {
    if (!mapInstance) return;

    const mapBounds = mapInstance.getBounds();

    // 마커가 화면에 보이지 않으면 latestPos 변경
    let hasMarkerInMapBounds = false;
    markersRef.current.forEach((marker, eventId) => {
      if (mapBounds.hasPoint(marker.getPosition())) {
        if (eventId !== 0n && hasMarkerInMapBounds === false)
          hasMarkerInMapBounds = true;
      }
    });
    // 모든 마커가 화면 밖에 있으면 가장 첫번째 요소로 lastestPos 변경
    if (!hasMarkerInMapBounds) {
      const fitEvent = events[0];
      if (fitEvent) {
        const fitEventPos = new naver.maps.LatLng(
          fitEvent.eventLocation.coordinates[0],
          fitEvent.eventLocation.coordinates[1],
        );
        mapInstance.setCenter(fitEventPos);
        setLatestPos(fitEventPos);
      }
    }
  }, [mapInstance, setLatestPos, events]);

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
    updateLatestPos,
    createMarkers,
    updateMarkers,
    createBlackMarker,
    removeBlackSBMarker,
  };
};

export default useMapMarkers;
