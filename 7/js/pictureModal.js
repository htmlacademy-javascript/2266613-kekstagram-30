import { isEscapeKey } from './util.js';
import { renderComments } from './renderComments.js';

// Находим тег body
const bodyElement = document.querySelector('body');

// Находим модальное окно, элемент куда будем добавлять данные
const bigPictureModal = document.querySelector('.big-picture');
// Находим кнопку закрытия модального окна
const closeBigPictureModalElement = bigPictureModal.querySelector('.big-picture__cancel');

// Находим элемент содержащий количество отображаемых и общее количетсво комментариев модального окна
const commentCountWrapper = bigPictureModal.querySelector('.social__comment-count');
// Находим количество отображаемых комментариев модального окна
const commentCountElement = bigPictureModal.querySelector('.social__comment-shown-count');
// Находим общее количество комментариев модального окна
const totalCommentCountElement = bigPictureModal.querySelector('.social__comment-total-count');
// Находим элемент для загрузки дополнительных комментариев модального окна
const loaderCommentElement = bigPictureModal.querySelector('.comments-loader');

const initCommentList = ({ comments }) => {
  commentCountElement.textContent = comments.length; // TODO исправить на то, сколько отображено комментариев
  totalCommentCountElement.textContent = comments.length; // показывает, сколько всего комментариев
  commentCountWrapper.classList.add('hidden'); // добавялем класс и прячем счетчик комментариев - временно
  loaderCommentElement.classList.add('hidden'); // добавляем класс и прячем загрузку доп комментариев - временно
};

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
  initCommentList(pictureData);
  renderPicture(pictureData);
};

const hidePicture = () => {
  bigPictureModal.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
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
