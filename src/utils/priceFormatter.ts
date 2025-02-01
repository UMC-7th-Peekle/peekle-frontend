const priceFormatter = (price: number) => {
  if (price === 0) return '무료';
  const addCommaPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${addCommaPrice}원`;
};

export default priceFormatter;
