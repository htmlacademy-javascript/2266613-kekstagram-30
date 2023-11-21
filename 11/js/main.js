import { renderGallery } from './renderGallery.js'; // Функция для создания галереи
import { getData } from './api.js';
import { initUploadForm } from './uploadForm.js'; // Модуль для работы формы загрузки изображения

getData().then((data) => {
  renderGallery(data);
});

initUploadForm();
