import { isEscapeKey, showMessage } from './util.js';
import { pristine } from './validation.js';
import { resetScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effects.js';
import { sendData } from './api.js';
import { initFileChooser } from './avatar.js';

const bodyElement = document.querySelector('body');
const uploadPreviewElement = document.querySelector('.img-upload__preview img');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadModalElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadFormCloseElement = uploadFormElement.querySelector('.img-upload__cancel');
const uploadSubmitElement = document.querySelector('.img-upload__submit');

const Message = {
  SUCCESS: 'success',
  ERROR: 'error',
  DATA_ERROR: 'data-error',
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
  URL.revokeObjectURL(uploadPreviewElement.src);
};

const onUploadInputElementChange = () => {
  showModal();
};

const onUploadFormCloseElementClick = () => {
  hideModal();
};

const sendValidData = (evt, onSuccess) => {
  sendData(new FormData(evt.target))
    .then(() => {
      onSuccess();
      showMessage(Message.SUCCESS);
    })
    .catch(() => {
      document.removeEventListener('keydown', onDocumentKeydown);
      showMessage(Message.ERROR);
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
      sendValidData(evt, onSuccess);
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
  uploadInputElement.addEventListener('change', onUploadInputElementChange);
  uploadFormCloseElement.addEventListener('click', onUploadFormCloseElementClick);
  initFileChooser();
  initEffect();
  setUploadFormSubmit(hideModal);
};

export { initUploadForm, Message, showModal };
