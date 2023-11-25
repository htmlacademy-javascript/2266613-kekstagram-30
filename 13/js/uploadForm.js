import { isEscapeKey, showMessage } from './util.js';
import { pristine } from './validation.js';
import { resetScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effects.js';
import { sendData } from './api.js';
import { initFileChooser } from './avatar.js';

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadModalElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeUploadFormElement = uploadFormElement.querySelector('.img-upload__cancel');
const uploadSubmitElement = document.querySelector('.img-upload__submit');

const Message = {
  success: 'success',
  error: 'error',
  dataError: 'data-error',
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const blockUploadSubmitElement = () => {
  uploadSubmitElement.disabled = true;
  uploadSubmitElement.textContent = SubmitButtonText.SENDING;
};

const unblockUploadSubmitElement = () => {
  uploadSubmitElement.disabled = false;
  uploadSubmitElement.textContent = SubmitButtonText.IDLE;
};

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

const validUploadForm = (evt, onSuccess) => {
  sendData(new FormData(evt.target))
    .then(() => {
      onSuccess();
      showMessage(Message.success);
    })
    .catch(() => {
      showMessage(Message.error);
    })
    .finally(() => {
      unblockUploadSubmitElement();
    });
};

const setUploadFormSubmit = (onSuccess) => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    blockUploadSubmitElement();

    const isValid = pristine.validate();
    if (isValid) {
      validUploadForm(evt, onSuccess);
    } else {
      unblockUploadSubmitElement();
    }
  });
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
}

const initUploadForm = () => {
  uploadInputElement.addEventListener('change', onUploadInputChange);
  closeUploadFormElement.addEventListener('click', onCloseUploadFormClick);
  initFileChooser();
  initEffect();
  setUploadFormSubmit(hideModal);
};

export { initUploadForm, Message };
