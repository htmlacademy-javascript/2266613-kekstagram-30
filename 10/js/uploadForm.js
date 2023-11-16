import { isEscapeKey } from './util.js';
import { pristine, isFormValid } from './validation.js';
import { resetScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effects.js';

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadModalElement = uploadFormElement.querySelector('.img-upload__overlay');
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
  resetScale();
  resetEffect();
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
initEffect();
