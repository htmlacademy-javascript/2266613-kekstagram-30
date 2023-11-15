// Находим шаблон миниатюры и в шаблоне находим нужный элемент
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функция создания (клонирования) одной миниатюры по шаблону
const createThumbnail = ({id, url, description, comments, likes}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

// Функция создания фрагмента, наполнения фрагмента миниатюрами и добавления наполненного фрагмента в элемент-контейнер
const renderThumbnails = (pictures, container) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
