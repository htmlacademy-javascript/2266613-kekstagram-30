import { isEscapeKey } from './util.js';
import { pristine } from './validation.js';
import { resetScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effects.js';
import { sendData } from './api.js';

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

// Функция для создания элементов для вывода сообщений при успешных действиях пользователя или ошибках
const showMessage = (typeResultMessage) => {
  const template = document.querySelector(`#${typeResultMessage}`).content.querySelector(`.${typeResultMessage}`);
  const messageClone = template.cloneNode(true);
  bodyElement.append(messageClone);

  const message = document.querySelector(`.${typeResultMessage}`);

  if (typeResultMessage === 'data-error') {
    setTimeout(() => {
      message.remove();
    },
    5000);
    return;
  }

  // document.addEventListener('keydown', onDocumentKeydown); не получается тут повесить обработчик такой, т.к. сообщение добавляется до того, как закроется форма (а во время закрытия она удаляет этот обработчик), хотя создание сообщения идет после then с успешным ответом

  const hideMessage = () => {
    message.remove();
  };
  const onCloseMessageElement = () => {
    hideMessage();
  };

  if (message.querySelector('button')) {
    const closeMessageElement = document.querySelector(`.${typeResultMessage}__button`);
    closeMessageElement.addEventListener('click', onCloseMessageElement);
  }
};

const setUploadFormSubmit = (onSuccess) => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockUploadSubmitElement(); // не работает блокировка кнопки почему-то
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showMessage(Message.success);
        })
        .catch(() => {
          showMessage(Message.error);
        })
        .finally(unblockUploadSubmitElement()); // не работает
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
  initEffect();
  setUploadFormSubmit(hideModal);
};

export { initUploadForm, showMessage, Message };
