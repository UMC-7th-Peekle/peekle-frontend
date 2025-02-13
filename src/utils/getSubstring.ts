const getSubstring = (str: string, limit = 50) => {
  const cleanedStr = str.replace(/\n/g, ' '); // '\n'을 공백으로 변환
  return cleanedStr.length > limit
    ? cleanedStr.slice(0, limit) + '...'
    : cleanedStr;
};

export default getSubstring;
