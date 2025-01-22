import {
  CATEGORY_OPTIONS,
  PRICE_OPTIONS,
  LOCATION_OPTIONS,
} from '@/constants/event';

const getLabelFromValue = (
  value: string,
  optionType: 'category' | 'price' | 'location', // 추가해 사용해주세요
): string => {
  const optionsMap = {
    category: CATEGORY_OPTIONS,
    price: PRICE_OPTIONS,
    location: LOCATION_OPTIONS,
  };

  const option = optionsMap[optionType].find(([, val]) => val === value);
  return option ? option[0] : '';
};

export default getLabelFromValue;
