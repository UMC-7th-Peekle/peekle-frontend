// import { useEffect, useState } from 'react';
// import MarkerClustering from '@/utils//MarkerClustering';

// const HTMLMARKER = {
//   content: `
//     <div style="width: 40px; height: 40px; border-radius: 50%; background: #b08fc5;
//       display: flex; align-items: center; justify-content: center">
//       <span style="color: white; font-size: 0.875rem">1</span>
//     </div>`,
//   size: new naver.maps.Size(40, 40),
//   anchor: new naver.maps.Point(20, 20),
// };

// const useMapCluster = (
//   markers: Map<bigint, naver.maps.Marker>,
//   map: naver.maps.Map | undefined,
// ) => {
//   const [cluster, setCluster] = useState<MarkerClustering | null>(null);

//   useEffect(() => {
//     if (map && markers.size > 0) {
//       const markerClustering = new MarkerClustering({
//         minClusterSize: 2, // 클러스터 최소 크기
//         maxZoom: 8, // 줌이 8 이상이면 클러스터 해제
//         map,
//         markers: Array.from(markers.values()), // Map을 배열로 변환
//         disableClickZoom: false, // 클릭 시 줌 활성화 여부
//         gridSize: 120, // 클러스터 간격
//         icons: [HTMLMARKER], // 클러스터 스타일
//         indexGenerator: [10, 100, 200, 500, 1000], // 클러스터 개수 범위 설정
//         stylingFunction: (clusterMarker: any, count: number) => {
//           clusterMarker.getElement().querySelector('span').textContent = count;
//         },
//       });

//       setCluster(markerClustering);
//     }
//   }, [map, markers]);

//   return { cluster };
// };

// export default useMapCluster;
