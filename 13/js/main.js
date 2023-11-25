import { getData } from './api.js';
import { renderGallery } from './renderGallery.js'; // Функция для создания галереи
import { filterButtons } from './sort.js';
import { initUploadForm } from './uploadForm.js'; // Модуль для работы формы загрузки изображения


const bootstrap = async () => {
  initUploadForm();
  const pictures = await getData();
  renderGallery(pictures);
  filterButtons(pictures);
};

bootstrap();
