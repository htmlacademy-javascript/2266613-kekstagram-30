import { getRandomArrayElement, debounce } from './util.js';
import { renderThumbnails } from './render-thumbnails.js';

const RERENDER_DELAY = 500;
const RANDOM_FILTER_COUNT = 10;

// Находим элемент-контейнер, куда будем добавлять сгенерированные по шаблону миниатюры
const thumbnailsContainer = document.querySelector('.pictures');
const filtersContainer = document.querySelector('.img-filters');
const defaultFilterElement = filtersContainer.querySelector('#filter-default');
const randomFilterElement = filtersContainer.querySelector('#filter-random');
const discussedFilterElement = filtersContainer.querySelector('#filter-discussed');

let currentFilterElement = defaultFilterElement;

const getUniqueRandomArray = (pictures, count) => {
  const uniqueArrayElements = [];

  while (uniqueArrayElements.length < count) {
    const randomElement = getRandomArrayElement(pictures);
    if (!uniqueArrayElements.includes(randomElement)) {
      uniqueArrayElements.push(randomElement);
    }
  }
  return uniqueArrayElements;
};

const sortThumbnails = (pictures) => {
  if (currentFilterElement === randomFilterElement) {
    const randomArrayElements = getUniqueRandomArray(pictures, RANDOM_FILTER_COUNT);
    renderThumbnails(randomArrayElements, thumbnailsContainer);
    return;
  }

  if (currentFilterElement === discussedFilterElement) {
    const discussionArrayElements = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
    renderThumbnails(discussionArrayElements, thumbnailsContainer);
    return;
  }

  if (currentFilterElement === defaultFilterElement) {
    renderThumbnails(pictures, thumbnailsContainer);
  }
};

const changeFilterElementState = (evt) => {
  currentFilterElement.classList.remove('img-filters__button--active');
  currentFilterElement = evt.target;
  currentFilterElement.classList.add('img-filters__button--active');
};

const pressFilterButtons = (pictures) => {
  const debouncedSortThumbnails = debounce(() => sortThumbnails(pictures), RERENDER_DELAY);
  const filterElementClickHandler = (evt) => {
    changeFilterElementState(evt, pictures);
    debouncedSortThumbnails();
  };

  defaultFilterElement.addEventListener('click', filterElementClickHandler);
  randomFilterElement.addEventListener('click', filterElementClickHandler);
  discussedFilterElement.addEventListener('click', filterElementClickHandler);
};

export { pressFilterButtons };
