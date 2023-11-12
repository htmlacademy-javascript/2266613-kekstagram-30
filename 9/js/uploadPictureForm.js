import './uploadValidation.js'; // Модуль для валидации формы загрузки изображения
import { isEscapeKey } from './util.js';

// Находим тег body
const bodyElement = document.querySelector('body');

// Находим элемент-контейнер, где находится форма редактирования изображения
const uploadContainer = document.querySelector('.img-upload');
// Находим элемент через который пользователь загружает изображение
const uploadInputElement = uploadContainer.querySelector('.img-upload__input');
// Находим форму редактирования изображения
const uploadEditFormElement = uploadContainer.querySelector('.img-upload__overlay');
// Находим форму предварительного просмотре изображения
// const uploadPreviewImgElement = uploadContainer.querySelector('.img-upload__preview img');
// Находим кнопку закрытия формы редактирования изображения
const closeUploadEditFormElement = uploadContainer.querySelector('.img-upload__cancel');

// uploadInputElement.addEventListener('change', (evt) => {
//   uploadEditFormElement.classList.remove('hidden');
//   bodyElement.classList.add('modal-open');
//   document.addEventListener('keydown', onDocumentKeydown);

//   // uploadPreviewImgElement.src = uploadInputElement.value;


// });

uploadContainer.addEventListener('click', (evt) => {
  const loaderPictureElement = evt.target.closest('.img-upload__control');

  if (!loaderPictureElement) {
    return;
  }

  evt.preventDefault();

  uploadEditFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  // uploadPreviewImgElement.src = uploadInputElement.value;


});

const hidePicture = () => {
  uploadEditFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadInputElement.form.reset(); // это правильно так сбросить value у инпута где загружают фото или нужно через например .value = ''; ?
};

const onCloseUploadEditFormElement = () => {
  hidePicture();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePicture();
  }
}

closeUploadEditFormElement.addEventListener('click', onCloseUploadEditFormElement);
