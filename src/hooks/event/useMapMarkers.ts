import { useRef, useCallback, useEffect } from 'react';
import { EventData } from '@/types/event';
import { theme } from '@/styles/theme';
import { getMarker } from '@/utils';
import { useMapStore } from '@/stores';
class CustomOverlay extends naver.maps.OverlayView {
  private _map: naver.maps.Map;
  private _position: naver.maps.LatLng;
  private _event: EventData;
  private _element: HTMLElement;

  constructor({
    map,
    position,
    event,
  }: {
    map: naver.maps.Map;
    position: naver.maps.LatLng;
    event: EventData;
  }) {
    super();
    this._map = map;
    this._position = position;
    this._event = event;
    this._element = document.createElement('div');
    this._element.innerHTML = `
      <div class="select-speech-bubble" style="position: relative;">
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
        "/>
      </div>`;

    this.setMap(map);
    this.setPosition(position);
  }

  onAdd() {
    const overlayLayer = this.getPanes().overlayLayer;
    overlayLayer.appendChild(this._element);
  }

  draw() {
    if (!this.getMap()) return;

    const projection = this.getProjection();
    const pixelPosition = projection.fromCoordToOffset(this._position);
    this._element.style.left = `${pixelPosition.x - 18}px`;
    this._element.style.top = `${pixelPosition.y - 35}px`;
  }

  onRemove() {
    if (this._element) {
      this._element.remove();
    }
  }

  setPosition(position: naver.maps.LatLng) {
    this._position = position;
    this.draw();
  }

  getPosition() {
    return this._position;
  }

  getElement() {
    return this._element;
  }
}

const useMapMarkers = (
  mapInstance: naver.maps.Map | undefined,
  events: EventData[],
) => {
  const markersRef = useRef<Map<bigint, naver.maps.Marker>>(new Map());
  const overlaysRef = useRef<Map<bigint, CustomOverlay>>(new Map());
  const { setSelectedEvent, selectedEvent, setLatestPos } = useMapStore();

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
      const overlay = overlaysRef.current.get(mapEvent.eventId);
      if (!marker || !overlay || !mapInstance) return;

      // 클릭된 InfoWindow 색상 변경
      const clickedContent = overlay.getElement() as HTMLElement;
      const clickedContentStyle = clickedContent.querySelector(
        '.selected-content',
      ) as HTMLElement;
      const clickedSpeechBubbleTail = clickedContent.querySelector(
        '.speech-bubble-tail',
      ) as HTMLElement;
      clickedContentStyle.style.background = theme.color.gray[900];
      clickedContentStyle.style.color = theme.color.gray[0];
      clickedSpeechBubbleTail.style.background = theme.color.gray[900];
      // 지도 이동 및 확대
      // mapInstance?.morph(
      //   new naver.maps.LatLng(mapEvent.latitude, mapEvent.longitude),
      //   19,
      //   { duration: 0, easing: 'easeOutCubic' }, // duration은 500ms 고정
      // );
      mapInstance?.setCenter(position);
      mapInstance?.setZoom(15);
    },
    [setSelectedEvent, markersRef, mapInstance, setLatestPos],
  );

  const createMarkers = useCallback(
    (lat: number, lng: number) => {
      if (!mapInstance) return;

      // 기존 마커 삭제
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current.clear();
      overlaysRef.current.clear();

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

        const overlay = new CustomOverlay({
          map: mapInstance,
          position,
          event,
        });
        overlaysRef.current.set(event.eventId, overlay);

        // 마커 클릭 이벤트 추가
        naver.maps.Event.addListener(marker, 'click', () =>
          handleMarkerClick(event),
        );
      });
    },
    [markersRef, mapInstance, events, handleMarkerClick],
  );

  const updateMarkers = useCallback(() => {
    if (!mapInstance) return;

    // 현재 지도의 화면 영역을 mapBounds 변수에 저장
    const mapBounds = mapInstance.getBounds();

    // const projection = mapInstance.getProjection();
    // const center = mapInstance.getCenter();

    const visibleIW: bigint[] = [];

    Array.from(markersRef.current.entries()).forEach(([key, marker]) => {
      const position = marker.getPosition();
      // const distance = projection.getDistance(center, position);
      const overlay = overlaysRef.current.get(key);
      console.log('mp', markersRef.current.get(1n)?.getPosition());
      console.log('op', overlaysRef.current.get(1n)?.getPosition());
      if (mapBounds.hasPoint(position)) {
        // 마커가 화면에 보이면 표시
        marker.setMap(mapInstance);
        // if (distance <= 500) // 500m 이내에서만
        overlay?.setMap(mapInstance);
        visibleIW.push(key);
      } else {
        // 화면 밖이면 숨김
        marker.setMap(null);
        overlay?.setMap(null);
      }
    });
    console.log('visibleIW', visibleIW);
  }, [mapInstance]);

  // selectedEvent가 있을 땐 해당 overlay 열기
  useEffect(() => {
    if (selectedEvent && mapInstance) {
      const marker = markersRef.current.get(selectedEvent.eventId);
      if (marker) {
        const overlay = overlaysRef.current.get(selectedEvent.eventId);
        if (overlay) {
          // overlay.setMap(mapInstance);
        }
      }
    }
  }, [selectedEvent, mapInstance]);

  return {
    markers: markersRef.current,
    overlays: overlaysRef.current,
    createMarkers,
    updateMarkers,
  };
};

export default useMapMarkers;
