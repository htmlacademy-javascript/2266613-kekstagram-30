import { getPicturesData } from '../js/data.js'; // Функция для получения случайных данных
import { renderGallery } from './renderGallery.js'; // Функция для создания галереи
import './uploadForm.js'; // Модуль для работы формы загрузки изображения

const arrayDataPictures = getPicturesData();

renderGallery(arrayDataPictures);
