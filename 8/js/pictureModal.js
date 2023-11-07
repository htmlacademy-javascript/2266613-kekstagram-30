import { isEscapeKey } from './util.js';
import { renderComments } from './renderComments.js';
import { lazyRenderComments } from './lazyRenderComments.js';

// Находим тег body
const bodyElement = document.querySelector('body');

// Находим модальное окно, элемент куда будем добавлять данные
const bigPictureModal = document.querySelector('.big-picture');
// Находим кнопку закрытия модального окна
const closeBigPictureModalElement = bigPictureModal.querySelector('.big-picture__cancel');

const closeEvent = new Event('modal-close', { bubbles: true });

// Находим элемент-контейнер, где будут находиться сгенерированные по шаблону комментарии
const commentsList = document.querySelector('.social__comments');
// Находим все элементы, содержащие комментарии
const commentsElements = commentsList.children;
// Находим элемент для загрузки дополнительных комментариев модального окна
// const loaderCommentElement = bigPictureModal.querySelector('.comments-loader');

const renderPicture = ({ url, description, likes }) => {
  bigPictureModal.querySelector('.big-picture__img img').src = url;
  bigPictureModal.querySelector('.big-picture__img img').alt = description;
  bigPictureModal.querySelector('.likes-count').textContent = likes;
  bigPictureModal.querySelector('.social__caption').textContent = description;
};

const showPicture = (pictureData) => {
  bigPictureModal.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  renderComments(pictureData.comments);
  renderPicture(pictureData);
  lazyRenderComments(commentsElements);
};

const hidePicture = () => {
  bigPictureModal.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureModal.dispatchEvent(closeEvent);
};

const onCloseBigPictureModal = () => {
  hidePicture();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePicture();
  }
}

closeBigPictureModalElement.addEventListener('click', (onCloseBigPictureModal));

export { showPicture };
