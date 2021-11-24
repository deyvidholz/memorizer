import { memorizerConfig } from './word.config';

export function jsonParser(data) {
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error('Unable to parse to JSON');
    console.error('Data: ', data);
    return data;
  }
}

export function arrayParser(words) {
  const indexes = Object.keys(words);
  const wordList = [];

  for (const index of indexes) {
    wordList.push(words[index]);
  }

  return wordList;
}

export function checkDataObject(data) {
  if (typeof data === 'string') {
    data = jsonParser(data);
  }

  if (typeof data !== 'object' || !data.words) {
    throw new Error(
      'Invalid data. Data must be an object like this:',
      memorizerConfig.defaultData,
    );
  }

  return true;
}
