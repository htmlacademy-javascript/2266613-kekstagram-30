/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { isEscapeKey } from './util.js';

// Находим элемент-контейнер, где находится форма редактирования изображения
const uploadContainer = document.querySelector('.img-upload');
// Находим тег формы редактирования изображения
const uploadFormElement = uploadContainer.querySelector('.img-upload__form');
// Находим поле для ввода хештегов формы редактирования изображения
const uploadHashtagsField = uploadContainer.querySelector('.text__hashtags');
// Находим поле для ввода комментария формы редактирования изображения
const uploadCommentField = uploadContainer.querySelector('.text__description');


const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('valid');
  } else {
    console.log('ne valid nifiga');
  }
});

let hashtagResult = '';
const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

function hashtagsValidate (value) {
  const array = value.trim().replace(/\s+/g, ' ').split(' '); // trim(), чтобы ошибка не выскакивала после того как поставлен пробел после хеш-тега
  console.log(array);

  if (uploadHashtagsField.value === '') {
    return true;
  }

  if (array.length > 5) {
    hashtagResult = 'количество хеш-тегов не может быть больше 5'; // не могу понять как это лучше реализовать?
    return false;
  }

  for (let i = 0; i < array.length; i++) {
    if (!regexp.test(array[i])) {
      hashtagResult = 'максимальная длина одного хэш-тега 20 символов, включая решётку, а так же хеш-тег не может состоять только из одной решётки';
      return false;
    }
  }

  const arrayClone = [];
  for (let i = 0; i < array.length; i++) {
    const arrayValue = array[i].toLowerCase();
    if (arrayClone.includes(arrayValue.toLowerCase())) {
      hashtagResult = 'хэш-теги не могут повторяться';
      return false;
    }
    arrayClone.push(arrayValue);
  }

  return true;
}

pristine.addValidator(
  uploadHashtagsField,
  hashtagsValidate,
  // '${hashtagResult}' // можно ли как-то это сделать рабочим вариантом подставления строки?
  'количество хеш-тегов не может быть больше 5; хэш-теги не могут повторяться; максимальная длина одного хэш-тега 20 символов, включая решётку, а так же хеш-тег не может состоять только из одной решётки'
);

uploadHashtagsField.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation(); // Предотвращаем всплытие события
  }
});

function commentValidate (value) {
  return value.length <= 140;
}

pristine.addValidator(
  uploadCommentField,
  commentValidate,
  'Максимальная длина 140 символов'
);

uploadCommentField.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation(); // Предотвращаем всплытие события
  }
});
