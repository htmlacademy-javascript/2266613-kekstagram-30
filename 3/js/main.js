const PHOTO_DESCRIPTION_COUNT = 25;

const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENTS_COUNT = 30;

const RANDOM_DESCRIPTION = [
  'Замечательный отдых на природе! #путешествие #природа #отдых',
  'Солнце, море и вечеринка! #пляж #море #вечеринка',
  'Путешествие в дикую природу. #приключения #отпуск #природа',
  'Обед с видом на горы. #горы #пейзаж #обед',
  'Моменты с животными. #животные #природа #фотосафари',
  'Красивый закат. #закат #пейзаж #отдых',
  'Летняя ночь под звёздами. #звёзды #лето #вечер',
  'Прогулки по городу. #город #путешествие #гулять',
  'Какой замечательный день! #счастье #позитив #друзья',
  'Моменты с близкими. #семья #друзья #веселье',
];
const RANDOM_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES =
[ 'Иван', 'Мария', 'Александр', 'Екатерина', 'Дмитрий', 'Анна', 'Петр', 'София', 'Алексей', 'Ольга', 'Константин', 'Наталья', 'Сергей', 'Виктория', 'Андрей', 'Елена', 'Михаил', 'Татьяна', 'Григорий', 'Людмила', 'Артем', 'Ирина', 'Николай', 'Маргарита', 'Василий', 'Евгения', 'Антон', 'Лариса', 'Вадим', 'Юлия'
];

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

const generateRandomCommentId = createRandomNumber(1, 10000); // как сделать "любое число"?

const createRandomComment = () => ({
  id: generateRandomCommentId(), // как сделать "любое число"?
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(RANDOM_MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const generateRandomPhotoDescriptionId = createRandomNumber(1, 25);
const generateRandomPhotoDescriptionUrl = createRandomNumber(1, 25);

const createRandomPhotoDescription = () => ({
  id: generateRandomPhotoDescriptionId(),
  url: `photos/${generateRandomPhotoDescriptionUrl()}.jpg`,
  description: getRandomArrayElement(RANDOM_DESCRIPTION),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: COMMENTS_COUNT}, createRandomComment)
});

const photosDescription = () => Array.from({length: PHOTO_DESCRIPTION_COUNT}, createRandomPhotoDescription);

photosDescription();

// eslint-disable-next-line no-console
console.dir(photosDescription, { depth: null });

// если я правильно понял то как делали на лайве 4го раздела, то там создаеются числа по очереди для id, а у меня сделано, что случайные, но не повторяющиеся. не пойму, я вообще задание правильно сделал или неправильно его понял?

// и в лайве подругому как-то генерируется комментарий, тоже не понимаю, у меня сделано не так как нужно?
