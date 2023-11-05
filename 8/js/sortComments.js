// Находим модальное окно, элемент куда будем добавлять данные
const bigPictureModal = document.querySelector('.big-picture');
// Находим количество отображаемых комментариев модального окна
const commentCountElement = bigPictureModal.querySelector('.social__comment-shown-count');
// Находим общее количество комментариев модального окна
const totalCommentCountElement = bigPictureModal.querySelector('.social__comment-total-count');
// Находим элемент для загрузки дополнительных комментариев модального окна
const loaderCommentElement = bigPictureModal.querySelector('.comments-loader');

/*
const addCommentsElements = (startIndex, currentIndex, comments) => {
  for (let i = currentIndex; i < currentIndex + startIndex && i < comments.length; i++) {
    comments[i].style.display = 'flex';
  }
  currentIndex += startIndex;
  commentCountElement.textContent = currentIndex > comments.length ? comments.length : currentIndex;

  if (currentIndex >= comments.length) {
    loaderCommentElement.classList.add('hidden');
  }
};
*/

const startCommentIndex = 5;
const currentCommentIndex = 0;

const onLoaderElementClick = (startIndex, currentIndex, comments) => {
  // addCommentsElements(startIndex, currentIndex, comments);
  for (let i = currentIndex; i < currentIndex + startIndex && i < comments.length; i++) {
    comments[i].style.display = 'flex';
  }
  currentIndex += startIndex;
  commentCountElement.textContent = currentIndex > comments.length ? comments.length : currentIndex;

  if (currentIndex >= comments.length) {
    loaderCommentElement.classList.add('hidden');
  }
  // console.log('click!');
};


const sortComments = (comments) => {
  commentCountElement.textContent = comments.length > startCommentIndex ? startCommentIndex : comments.length; // показывает, сколько отображено комментариев
  totalCommentCountElement.textContent = comments.length; // показывает, сколько всего комментариев

  for (let i = startCommentIndex; i < comments.length; i++) {
    comments[i].style.display = 'none';
  }

  loaderCommentElement.addEventListener('click', () => {
    onLoaderElementClick(startCommentIndex, currentCommentIndex, comments);
  });

  /*
  loaderCommentElement.addEventListener('click', () => {
    for (let i = currentCommentIndex; i < currentCommentIndex + startCommentIndex && i < comments.length; i++) {
      comments[i].style.display = 'flex';
    }
    currentCommentIndex += startCommentIndex;
    commentCountElement.textContent = currentCommentIndex > comments.length ? comments.length : currentCommentIndex;

    if (currentCommentIndex >= comments.length) {
      loaderCommentElement.classList.add('hidden');
    }
  });
  */
};

export { sortComments };
