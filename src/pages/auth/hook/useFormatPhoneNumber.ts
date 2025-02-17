import { useEffect } from 'react';

const useFormatPhoneNumber = (
  phoneNumber: string,
  setPhoneNumber: (phoneNumber: string) => void,
) => {
  useEffect(() => {
    const formatPhoneNumber = (value: string) => {
      // 숫자만 남기기
      const numbers = value.replace(/[^0-9]/g, '');

      // 시작 번호가 010, 011 등인지 확인
      const isMobile = /^(01[0-9])/.test(numbers);

      if (numbers.length <= 3) {
        return numbers;
      } else if (isMobile) {
        // 모바일 번호 포맷
        if (numbers.length <= 6) {
          return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else if (numbers.length === 10) {
          // '010-123-1234' 형식
          return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
        } else {
          // '010-1234-5678' 형식
          if (numbers.length === 7) {
            if (value.length === 9) {
              return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}`;
            }
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}`;
          }
          return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
        }
      } else {
        // 지역번호 포맷
        const areaCode = numbers.startsWith('02')
          ? numbers.slice(0, 2)
          : numbers.slice(0, 3);
        const mainNumber = numbers.startsWith('02')
          ? numbers.slice(2)
          : numbers.slice(3);

        if (areaCode === '02') {
          // 서울 (02) 지역번호
          return mainNumber.length <= 3
            ? `${areaCode}-${mainNumber}`
            : `${areaCode}-${mainNumber.slice(0, 3)}-${mainNumber.slice(3, 7)}`;
        } else {
          // 다른 지역번호 (031, 032 등)
          return mainNumber.length <= 4
            ? `${areaCode}-${mainNumber}`
            : `${areaCode}-${mainNumber.slice(0, 3)}-${mainNumber.slice(3, 7)}`;
        }
      }
    };

    if (phoneNumber) {
      const formattedNumber = formatPhoneNumber(phoneNumber);
      if (formattedNumber !== phoneNumber) {
        setPhoneNumber(formattedNumber);
      }
    }
  }, [phoneNumber, setPhoneNumber]);
};

export default useFormatPhoneNumber;
