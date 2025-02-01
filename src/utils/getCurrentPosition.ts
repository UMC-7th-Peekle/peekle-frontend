const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation이 지원되지 않습니다'));
      return;
    }

    // const timeoutId = setTimeout(() => {
    //   reject(new Error('위치 정보를 가져오는 데 시간이 초과되었습니다.'));
    // }, 10000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // clearTimeout(timeoutId);
        resolve(position);
      },
      (error) => {
        // clearTimeout(timeoutId);
        reject(new Error(`Geolocation 에러: ${error.message}`));
      },
    );
  });
};

export default getCurrentPosition;
