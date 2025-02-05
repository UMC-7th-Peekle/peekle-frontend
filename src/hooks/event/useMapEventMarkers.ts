import { useState, useCallback } from 'react';
import { EventData } from '@/types/event';
import { theme } from '@/styles/theme';
import { getMarker } from '@/utils';
import { useMapStore } from '@/stores';

const useMapEventMarkers = (
  mapInstance: naver.maps.Map | undefined,
  events: EventData[],
) => {
  const [markers] = useState<Map<bigint, naver.maps.Marker>>(
    new Map<bigint, naver.maps.Marker>(),
  );
  const [infoWindows] = useState<Map<bigint, naver.maps.InfoWindow>>(
    new Map<bigint, naver.maps.InfoWindow>(),
  );
  const { setSelectedEvent } = useMapStore();

  // 마커 클릭 이벤트
  const handleMarkerClick = useCallback(
    (mapEvent: EventData) => {
      setSelectedEvent(mapEvent);
      const marker = markers.get(mapEvent.eventId);
      const infoWindow = infoWindows.get(mapEvent.eventId);
      if (!marker || !infoWindow || !mapInstance) return;

      if (infoWindow.getMap()) {
        // InfoWindow가 열려 있다면 닫기
        infoWindow.close();
        setSelectedEvent(null);
      } else {
        // InfoWindow가 닫혀 있다면 열기
        infoWindow.open(mapInstance, marker);
        // 지도 이동 및 확대
        // mapInstance?.morph(
        //   new naver.maps.LatLng(mapEvent.latitude, mapEvent.longitude),
        //   19,
        //   { duration: 0, easing: 'easeOutCubic' }, // duration은 500ms 고정
        // );
        mapInstance?.setCenter(
          new naver.maps.LatLng(mapEvent.latitude, mapEvent.longitude),
        );
        mapInstance?.setZoom(15);
      }
    },
    [setSelectedEvent, markers, infoWindows, mapInstance],
  );

  const createMarkers = useCallback(() => {
    if (!mapInstance) return;

    events.forEach((event) => {
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

      markers.set(event.eventId, marker);

      // 마커 클릭 이벤트 추가
      naver.maps.Event.addListener(marker, 'click', () =>
        handleMarkerClick(event),
      );

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
    });
  }, [markers, infoWindows, mapInstance, events, handleMarkerClick]);

  const updateMarkers = useCallback(() => {
    if (!mapInstance) return;
    // 현재 지도의 화면 영역을 mapBounds 변수에 저장
    const mapBounds = mapInstance.getBounds();
    // 마커 객체 배열을 순회하며 각 마커의 위치를 position 변수에 저장
    markers.forEach((marker) => {
      const position = marker.getPosition();
      if (mapBounds.hasPoint(position)) {
        // 마커가 화면에 보이면 표시
        marker.setMap(mapInstance);
      } else {
        // 화면 밖이면 숨김
        marker.setMap(null);
      }
    });
  }, [mapInstance, markers]);

  return { markers, infoWindows, createMarkers, updateMarkers };
};

export default useMapEventMarkers;
