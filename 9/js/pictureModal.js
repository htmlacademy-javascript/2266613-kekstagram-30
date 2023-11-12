import { isEscapeKey } from './util.js';

// Находим тег body
const bodyElement = document.querySelector('body');

// Находим модальное окно, элемент куда будем добавлять данные
const bigPictureModal = document.querySelector('.big-picture');
// Находим элемент-кнопку закрытия модального окна
const closeBigPictureModalElement = bigPictureModal.querySelector('.big-picture__cancel');

// Находим элемент-контейнер, куда будем добавлять сгенерированные по шаблону комментарии
const commentsList = document.querySelector('.social__comments');
// Находим количество отображаемых комментариев модального окна
const commentCountElement = bigPictureModal.querySelector('.social__comment-shown-count');
// Находим общее количество комментариев модального окна
const totalCommentCountElement = bigPictureModal.querySelector('.social__comment-total-count');
// Находим элемент-кнопку для загрузки дополнительных комментариев модального окна
const loaderCommentsElement = bigPictureModal.querySelector('.comments-loader');

const COMMENTS_COUNT_SHOW = 5;
let commentsCountShown = 0;
let comments = [];

// Находим шаблон комментария и в шаблоне находим нужный элемент
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

// Функция создания (клонирования) одного комментария по шаблону
const createComment = ({ avatar, message, name }) => {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

// Функция содания фрагмента, наполнения фрагмента комментариями и добавления наполненного фрагмента в элемент-контейнер
const renderComments = () => {
  commentsCountShown += COMMENTS_COUNT_SHOW;

  if (commentsCountShown >= comments.length) {
    loaderCommentsElement.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    loaderCommentsElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  commentsList.innerHTML = '';
  commentsList.append(fragment);

  commentCountElement.textContent = commentsCountShown;
  totalCommentCountElement.textContent = comments.length;
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const hidePicture = () => {
  commentsCountShown = 0;
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

  comments = pictureData.comments;
  if (comments.length > 0) {
    renderComments();
  } else {
    commentsList.innerHTML = '';
    commentCountElement.textContent = comments.length;
    totalCommentCountElement.textContent = comments.length;
  }

  renderPicture(pictureData);
};

closeBigPictureModalElement.addEventListener('click', onCloseBigPictureModal);
loaderCommentsElement.addEventListener('click', onCommentsLoaderClick);

export { showPicture };
