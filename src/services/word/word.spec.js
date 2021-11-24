import { memorizerConfig } from './word.config';
import {
  createMemorizerDataObject,
  deleteWord,
  find,
  findOne,
  load,
  reset,
  setWord,
} from './word.service';

describe('WordService', () => {
  beforeAll(() => {
    createMemorizerDataObject();
  });

  it('should create memorizer object', () => {
    const data = createMemorizerDataObject();

    expect(data).toBe(memorizerConfig.defaultData);
    expect(data).toHaveProperty('words');
    expect(data.words).toBe(memorizerConfig.defaultData.words);
  });

  it('should create a word', () => {
    const word = setWord({
      name: 'Apple',
      translation: 'Apfel',
    });

    expect(word).toHaveProperty('id');
    expect(word).toHaveProperty('name');
    expect(word).toHaveProperty('translation');
    expect(word).toHaveProperty('counter');
    expect(word).toHaveProperty('memorized');
    expect(word.id).toBe(word.name.toLowerCase());
  });

  it('should find all words', () => {
    const words = find();
    expect(typeof words).toBe('object');
    expect(words.length).toBeGreaterThanOrEqual(0);
  });

  it('should find one specific word', () => {
    const word = findOne('apple');

    expect(typeof word).toBe('object');
    expect(word.id).toBe(word.name.toLowerCase());
  });

  it('should delete a specific word', () => {
    deleteWord('apple');
    const word = findOne('apple');
    expect(word).toBe(null);
  });

  it('should reset memorizer object', () => {
    reset();

    const data = load();
    expect(Object.keys(data.words).length).toEqual(0);
  });
});
