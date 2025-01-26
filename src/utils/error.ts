export const isNetworkError = (error: Error): boolean => {
  return error.name === 'TypeError' && error.message.includes('Network');
};

export const isServerError = (error: Error): boolean => {
  return error.message.includes('500') || error.message.includes('404');
};
