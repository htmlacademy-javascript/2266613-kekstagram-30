const RANDOM_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!]'
];
const NAMES = [
  'Иван',
  'Мария',
  'Александр',
  'Екатерина',
  'Дмитрий',
  'Анна',
  'Петр',
  'София',
  'Алексей',
  'Ольга',
  'Константин',
  'Наталья',
  'Сергей',
  'Виктория',
  'Андрей',
  'Елена',
  'Михаил',
  'Татьяна',
  'Григорий',
  'Людмила',
  'Артем',
  'Ирина',
  'Николай',
  'Маргарита',
  'Василий',
  'Евгения',
  'Антон',
  'Лариса',
  'Вадим',
  'Юлия'
];
const COMMENTS_COUNT = 1;
const PHOTODESCRIPTION_COUNT = 1;

function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomNumber (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateRandomCommentId = createRandomNumber(1, 100); // как сделать "любое число"?

const createRandomComment = () => ({
  id: generateRandomCommentId(), // как сделать "любое число"?
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(RANDOM_MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const generateRandomPhotoDescriptionId = createRandomNumber(1, 25);
const generateRandomPhotoDescriptionUrl = createRandomNumber(1, 25);

const createRandomPhotoDescription = () => ({
  id: generateRandomPhotoDescriptionId(),
  url: `photos/${generateRandomPhotoDescriptionUrl()}.jpg`,
  description: 'описание фотографии, которое я придумал',
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: COMMENTS_COUNT}, createRandomComment)
});

const photosDescription = Array.from({length: PHOTODESCRIPTION_COUNT}, createRandomPhotoDescription);

// eslint-disable-next-line no-console
console.dir(photosDescription, { depth: null });
