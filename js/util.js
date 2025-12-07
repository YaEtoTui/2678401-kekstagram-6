export const countPhotos = 25;
export const countComments = 1000000;

/**
 * Функция для генерации случайного числа в заданном диапазоне
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const findRandomInteger = function (min, max) {
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

const showModal = (currentElement, onEscape) => {
  currentElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscape);
}

const hideModal = (currentElement, onEscape) => {
  currentElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscape);
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export {showModal, hideModal, isEscapeKey };

export const generateCommentId = createRandomIdFromRangeGenerator(1, countComments);
