const getSubstring = (str: string, limit = 50) => {
  return str.length > limit ? str.slice(0, limit) + '...' : str;
};

export default getSubstring;
