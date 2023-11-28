import { renderThumbnails } from './render-thumbnails.js';
import { showPicture } from './picture-modal.js';

// Находим элемент-контейнер, куда будем добавлять сгенерированные по шаблону миниатюры
const thumbnailsContainer = document.querySelector('.pictures');

// Создаем галерею по массиву (import { getPhotosData } from '../js/data';), помещаем галерею миниатюрами в элемент-контейнер, кри клике на миниатюру определяем ее id и сравниваем с id из массива.
const renderGallery = (pictures) => {
  if (!pictures) {
    return;
  }

  renderThumbnails(pictures, thumbnailsContainer);

  thumbnailsContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if(!thumbnail) {
      return;
    }

    evt.preventDefault();

    const thumbnailId = +thumbnail.dataset.thumbnailId;
    const pictureData = pictures.find(({ id }) => id === thumbnailId);

    showPicture(pictureData);
  });
};

export { renderGallery };
