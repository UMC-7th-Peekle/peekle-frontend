const getFirstDentence = (str: string) => {
  return str.match(/[^.!?]+[.!?]/)?.[0] ?? str;
};

export default getFirstDentence;
