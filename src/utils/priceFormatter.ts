const priceFormatter = (price: string) => {
  if (!price) return '';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default priceFormatter;
