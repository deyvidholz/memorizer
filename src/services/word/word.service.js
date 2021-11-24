import { memorizerConfig } from './word.config';
import { arrayParser, checkDataObject, jsonParser } from './word.helpers';

export function createMemorizerDataObject() {
  save(memorizerConfig.defaultData);
  return memorizerConfig.defaultData;
}

/**
 * Setting up localStorage object
 */
(function () {
  let data = localStorage.getItem(memorizerConfig.key);

  if (!data) {
    createMemorizerDataObject();
    return;
  }

  checkDataObject(data);
})();

/**
 * Load localStorage memorizer data object
 * @returns object
 */
export function load() {
  let data = localStorage.getItem(memorizerConfig.key);
  checkDataObject(data);
  return jsonParser(data);
}

/**
 *
 * @param {object} data memorizer data object
 * @param {object} data.words memorizer words object
 * @param {string} data.words.name word name
 * @param {string} data.words.translation word translation
 * @param {number} data.words.counter times the user got the right word translation
 * @param {boolean} data.words.memorized user has or not memorized the word meaning
 * @returns memorized data object
 */
export function save(data) {
  checkDataObject(data);
  localStorage.setItem(memorizerConfig.key, JSON.stringify(data));
  return data;
}

/**
 * Get the list of words registered
 * @returns list of word objects
 */
export function find() {
  const data = load();
  return arrayParser(data.words);
}

/**
 * Return a specific word
 * @param {string} wordName name of word
 * @returns memorizer word object
 */
export function findOne(wordName) {
  const data = load();
  return data.words[wordName.toLowerCase()] || null;
}

/**
 * Add or update a word
 * @param {object} word memorizer word object
 * @param {string} word.name word name
 * @param {string} word.translation word translation
 * @param {number} word.counter word counter
 * @param {boolean} word.memorized
 */
export function setWord(word) {
  const id = word.name.toLowerCase();

  word = {
    id,
    name: word.name,
    translation: word.translation,
    counter: +word.counter || 0,
    memorized: !!word.memorized || false,
  };

  if (!word.name || !word.translation) {
    throw new Error('Invalid word.');
  }

  const data = load();
  data.words[id] = word;
  save(data);
  return word;
}

export function deleteWord(wordName) {
  const data = load();
  delete data.words[wordName.toLowerCase()];
  save(data);
}

export function reset() {
  createMemorizerDataObject();
}
