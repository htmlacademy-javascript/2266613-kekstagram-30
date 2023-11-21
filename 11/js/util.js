const bodyElement = document.querySelector('body');
const REMOVE_MESSAGE_TIMEOUT = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const hideMessage = (message) => {
  message.remove();
  document.body.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onBodyClick(evt, typeResultMessage) {
  if (evt.target.closest(`.${typeResultMessage}`)) { // не могу исправить данную функцию, из-за нее ломается отображение сообщений, но не могу понять как это исправить(
    return;
  }

  hideMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

// Функция для создания элементов вывода сообщений при успешных действиях пользователя или ошибках
const showMessage = (typeResultMessage) => {
  const template = document.querySelector(`#${typeResultMessage}`).content.querySelector(`.${typeResultMessage}`);
  const messageClone = template.cloneNode(true);
  bodyElement.append(messageClone);

  const message = document.querySelector(`.${typeResultMessage}`);

  if (typeResultMessage === 'data-error') {
    setTimeout(() => {
      message.remove();
    },
    REMOVE_MESSAGE_TIMEOUT);
    return;
  }

  const onCloseMessageElementClick = () => {
    hideMessage(message);
  };

  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);

  if (message.querySelector('button')) {
    const closeMessageElement = document.querySelector(`.${typeResultMessage}__button`);
    closeMessageElement.addEventListener('click', onCloseMessageElementClick(typeResultMessage));
  }
};

export { isEscapeKey, showMessage };
