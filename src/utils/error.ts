export const isNetworkError = (error: Error): boolean => {
  return error.name === 'TypeError' && error.message.includes('Network');
};

export const isServerError = (error: Error): boolean => {
  const message = error.message ?? '';
  if (message.includes('500')) {
    return true;
  }

  const serverErrorCodes = [
    '503 MULTER_ERROR',
    '503 CIPHER_ERROR',
    '500 UNKNOWN_ERROR',
    '500 UNHANDLED_ERROR',
  ];

  return serverErrorCodes.some((code) => message.includes(code));
};
