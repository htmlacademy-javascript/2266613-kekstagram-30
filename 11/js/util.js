// Функция возврата случайного числа в заданном диапазоне (min и max)
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция создает замыкание, которое позволяет генерировать случайные числа в заданном диапазоне (min и max) без повторений
function createRandomNumber (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
}

// Функция проверки для проверки, является ли клавиша, переданная в событии evt, клавишей "Escape"
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция возвращающая случайный элемент переданного массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export { getRandomInteger, createRandomNumber, getRandomArrayElement, isEscapeKey };
