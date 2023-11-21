import { getData } from './api.js';
import { renderGallery } from './renderGallery.js'; // Функция для создания галереи
import { initUploadForm } from './uploadForm.js'; // Модуль для работы формы загрузки изображения

const bootstrap = async () => {
  const pictures = await getData();
  renderGallery(pictures);

  initUploadForm();
};

bootstrap();
