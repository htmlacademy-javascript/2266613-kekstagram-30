import {getPhotosDescription} from '../js/data';

// Находим элемент, куда будем добавлять изображения
const picturesList = document.querySelector('.pictures');

// Находим фрагмент с содержимым темплейта и в фрагменте находим нужный элемент
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = getPhotosDescription();

const fragment = document.createDocumentFragment();

const renderingThumbnails = () => {
  similarPictures.forEach(({url, description, comments, likes}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = url;
    newPicture.querySelector('.picture__img').alt = description;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    newPicture.querySelector('.picture__likes').textContent = likes;

    fragment.append(newPicture);
  });

  picturesList.append(fragment);
};

export {renderingThumbnails};
