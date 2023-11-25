import { isEscapeKey } from './util.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными, они не могут повторяться',
  INVALID_PATTERN: 'Неправильный хэштег, максимальная длина одного хэштега 20 символов, включая решётку, а так же хештег не может состоять только из одной решётки',
};

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadHashtagsFieldElement = uploadFormElement.querySelector('.text__hashtags');
const uploadCommentFieldElement = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(
  uploadFormElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  },
  true
);

const normalizeTags = (tagsString) => tagsString.trim().replace(/\s+/g, ' ').split(' ');

const hasValidTags = (value) => {
  if (value.trim() === '') {
    return true;
  }

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
    if (arrayClone.includes(arrayValue)) {
      return false;
    }
    arrayClone.push(arrayValue);
  }

  return true;
};

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

pristine.addValidator(
  uploadHashtagsFieldElement,
  hasValidTags,
  errorText.INVALID_PATTERN,
  3,
  true
);
pristine.addValidator(
  uploadHashtagsFieldElement,
  hasUniqueTags,
  errorText.NOT_UNIQUE,
  2,
  true
);
pristine.addValidator(
  uploadHashtagsFieldElement,
  hasValidCount,
  errorText.INVALID_COUNT,
  1,
  true
);

const commentValidate = (value) => value.length <= 140;

pristine.addValidator(
  uploadCommentFieldElement,
  commentValidate,
  'Максимальная длина 140 символов'
);

const isTextFieldFocused = (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
};

uploadHashtagsFieldElement.addEventListener('keydown', isTextFieldFocused);
uploadCommentFieldElement.addEventListener('keydown', isTextFieldFocused);

export { pristine };
