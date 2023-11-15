import { isEscapeKey } from './util.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными, они не могут повторяться',
  INVALID_PATTERN: 'Неправильный хэштег, максимальная длина одного хэштега 20 символов, включая решётку, а так же хештег не может состоять только из одной решётки',
};

// Находим форму редактирования изображения
const uploadFormElement = document.querySelector('.img-upload__form');
// Находим поле для ввода хештегов формы редактирования изображения
const uploadHashtagsField = uploadFormElement.querySelector('.text__hashtags');
// Находим поле для ввода комментария формы редактирования изображения
const uploadCommentField = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(
  uploadFormElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  },
  true
);

const isFormValid = (evt) => pristine.validate() ? pristine.reset() : evt.preventDefault();

const normalizeTags = (tagsString) => tagsString
  .trim()
  .replace(/\s+/g, ' ')
  .split(' ');

const hasValidTags = (value) => {
  const array = normalizeTags(value);

  for (let i = 0; i < array.length; i++) {
    if (!VALID_SYMBOLS.test(array[i])) {
      return false;
    }
  }

  return true;
};

const hasUniqueTags = (value) => {
  const array = normalizeTags(value);
  const arrayClone = [];

  for (let i = 0; i < array.length; i++) {
    const arrayValue = array[i].toLowerCase();
    if (arrayClone.includes(arrayValue.toLowerCase())) {
      return false;
    }
    arrayClone.push(arrayValue);
  }

  return true;
};

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

pristine.addValidator(
  uploadHashtagsField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);
pristine.addValidator(
  uploadHashtagsField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);
pristine.addValidator(
  uploadHashtagsField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

const commentValidate = (value) => value.length <= 140;

pristine.addValidator(
  uploadCommentField,
  commentValidate,
  'Максимальная длина 140 символов'
);

const isTextFieldFocused = (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation(); // Предотвращаем всплытие события
  }
};

uploadHashtagsField.addEventListener('keydown', isTextFieldFocused);
uploadCommentField.addEventListener('keydown', isTextFieldFocused);

export { pristine, isFormValid };
