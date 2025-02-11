// import { theme } from '@/styles/theme';
// import MarkerClustering from '@/utils/MarkerClustering';

// const useMapCluster = (
//   markers: Map<bigint, naver.maps.Marker>,
//   map: naver.maps.Map | undefined,
// ) => {
//   if (!map || markers.size < 0) return;

//   const HTMLMARKER = {
//     content: `
//       <div style="width: 40px; height: 40px; border-radius: 50%; background: ${theme.color.primary[500]};
//         display: flex; align-items: center; justify-content: center">
//         <span style="color: white; font-size: 0.875rem">1</span>
//       </div>`,
//     anchor: new naver.maps.Point(20, 20),
//   };

//   document.addEventListener('DOMContentLoaded', () => {
//     const markerClustering = new MarkerClustering({
//       minClusterSize: 2, // 클러스터 최소 크기
//       maxZoom: 8, // 줌이 8 이상이면 클러스터 해제
//       map,
//       markers: Array.from(markers.values()), // Map을 배열로 변환
//       disableClickZoom: false, // 클릭 시 줌 활성화 여부
//       gridSize: 120, // 클러스터 간격
//       icons: [HTMLMARKER], // 클러스터 스타일
//       indexGenerator: [10, 100, 200, 500, 1000], // 클러스터 개수 범위 설정
//       averageCenter: true,
//       stylingFunction: (clusterMarker: naver.maps.Marker, count: number) => {
//         if (clusterMarker?.getElement()) {
//           const spanElement = clusterMarker.getElement()?.querySelector('span');
//           if (spanElement) spanElement.textContent = count.toString();
//         }
//       },
//     });
//     return markerClustering;
//   });
// };

// export default useMapCluster;
