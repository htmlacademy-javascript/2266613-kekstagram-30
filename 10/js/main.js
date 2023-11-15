import { getPicturesData } from '../js/data.js'; // Функция для получения случайных данных
import { renderGallery } from './renderGallery.js'; // Функция для создания галереи
import './uploadPictureForm.js'; // Модуль для работы формы загрузки изображения
import './uploadPictureEdit.js';

const arrayDataPictures = getPicturesData();

renderGallery(arrayDataPictures);
