import { getPicturesData } from '../js/data.js'; // Функция для получения случайных данных
import { renderGallery } from './renderGallery.js'; // Функция для создания галереи

const arrayDataPictures = getPicturesData();

renderGallery(arrayDataPictures);
