const getBaseUrl = () => {
  return import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_VERCEL_URL
    : import.meta.env.VITE_DEVELOP_URL;
};

export default getBaseUrl;
