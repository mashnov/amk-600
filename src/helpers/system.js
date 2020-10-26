import numeral from 'numeral';

export const sleep = (time = 500) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const replaceCurly = (string = '', from = [], to = []) => {
  let resultString = string;
  from.forEach((fromItem, index) => {
    resultString = resultString.replace(new RegExp(`{${fromItem}}`, 'gi'), to[index]);
  });
  return resultString;
};

export const numberTransformer = (value) => {
  const number = numeral(value);
  return number.format('0,0');
};
