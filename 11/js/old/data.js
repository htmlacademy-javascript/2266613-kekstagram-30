import { getRandomInteger, createRandomNumber, getRandomArrayElement } from '../js/util.js';

const PICTURE_DATA_COUNT = 25;

const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENTS_COUNT = 30;

const RANDOM_DESCRIPTIONS = [
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

const generateRandomCommentId = createRandomNumber(1, Number.MAX_SAFE_INTEGER);

const createRandomComment = () => ({
  id: generateRandomCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(RANDOM_MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const generateRandomPictureDescriptionId = createRandomNumber(1, 25);
const generateRandomPictureDescriptionUrl = createRandomNumber(1, 25);
const generateRandomCommentsCount = createRandomNumber(0, COMMENTS_COUNT);

const createRandomPictureDescription = () => ({
  id: generateRandomPictureDescriptionId(),
  url: `photos/${generateRandomPictureDescriptionUrl()}.jpg`,
  description: getRandomArrayElement(RANDOM_DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: generateRandomCommentsCount()}, createRandomComment)
});

const getPicturesData = () => Array.from({length: PICTURE_DATA_COUNT}, createRandomPictureDescription);

export { getPicturesData };
