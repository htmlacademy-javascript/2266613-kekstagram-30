// рабочий, не используется, перемещен в pictureModal

// Находим шаблон комментария и в шаблоне находим нужный элемент
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
// Находим элемент-контейнер, куда будем добавлять сгенерированные по шаблону комментарии
const commentsList = document.querySelector('.social__comments');

// Функция создания (клонирования) комментария по шаблону
const createComment = ({ avatar, message, name }) => {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

// Функция содания фрагмента, наполнения фрагмента комментариями и добавления наполненного фрагмента в элемент-контейнер
const renderComments = (comments) => {
  commentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();

  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentsList.append(fragment);
};

export { renderComments };
