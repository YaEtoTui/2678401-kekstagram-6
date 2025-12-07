const nameList = [
  'Артем', 'Мария', 'Иван', 'Ольга', 'Дмитрий',
  'Екатерина', 'Алексей', 'Наталья', 'Сергей', 'Анна'
];

const messageList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const PHOTO_COUNT = 25;
export const COMMENT_COUNT = 1000000;

/**
 * Функция для генерации случайного числа в заданном диапазоне
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const findRandomInteger = function (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

/**
 * Функция для генерации случайного числа в заданном диапазоне без повторений
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const createRandomIdFromRangeGenerator = function (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = findRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = findRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

/**
 * Генерируем комментарий
 * @returns {Array<
 *    id: number,
 *    avatar: string,
 *    message: string,
 *    name: string
 *  >}
 */
const generateComment = function () {
  return {
    id: createRandomIdFromRangeGenerator(1, COMMENT_COUNT),
    avatar: `img/avatar-${findRandomInteger(1, 6)}.svg`,
    name: nameList[findRandomInteger(0, nameList.length - 1)],
    message: Array.from(
      {length: findRandomInteger(1, 2)},
      () => messageList[findRandomInteger(0, messageList.length - 1)]
    ).join(' '),
  };
};

/**
 * Функция для генерации массива фотографий
 * @returns {Array<{
 *  id: number,
 *  url: string,
 *  description: string,
 *  likes: number,
 *  comments: Array<{
 *    id: number,
 *    avatar: string,
 *    message: string,
 *    name: string
 *  }>
 *  }>}
 */
export const generatePhotoList = function (count) {

  const photoList = [];
  for (let i = 1; i <= count; i++) {
    const commentCount = findRandomInteger(0, 30);
    const commentList = Array.from(
      {length: commentCount},
      () => generateComment()
    );

    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Фотография ${i}`,
      likes: findRandomInteger(15, 200),
      comments: commentList,
    };

    photoList.push(photo);
  }

  return photoList;
};

export const photoList = generatePhotoList(PHOTO_COUNT);
