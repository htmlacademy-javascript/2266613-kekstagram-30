import { pristine, isFormValid } from './uploadValidation.js';
import './uploadEdit.js'; // Модуль для редактирования изображения формы загрузки изображения
import { isEscapeKey } from './util.js';

// Находим тег body
const bodyElement = document.querySelector('body');
// Находим форму редактирования изображения
const uploadFormElement = document.querySelector('.img-upload__form');
// Находим элемент через который пользователь загружает изображение
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
// Находим элемент отвечающий за скрытие формы редактирования изображения
const uploadModalElement = uploadFormElement.querySelector('.img-upload__overlay');
// Находим кнопку закрытия формы редактирования изображения
const closeUploadFormElement = uploadFormElement.querySelector('.img-upload__cancel');

const showModal = () => {
  uploadModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  uploadModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadInputElement.form.reset();
  pristine.reset();
};

const onUploadInputChange = () => {
  showModal();
};

const onCloseUploadFormClick = () => {
  hideModal();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
}

const onUploadFormSubmit = (evt) => {
  isFormValid(evt);
};

uploadInputElement.addEventListener('change', onUploadInputChange);
closeUploadFormElement.addEventListener('click', onCloseUploadFormClick);
uploadFormElement.addEventListener('submit', onUploadFormSubmit);
