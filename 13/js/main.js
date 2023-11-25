import { getData } from './api.js';
import { renderGallery } from './renderGallery.js';
import { filterButtons } from './sort.js';
import { initUploadForm } from './uploadForm.js';


const bootstrap = async () => {
  initUploadForm();
  const pictures = await getData();
  renderGallery(pictures);
  filterButtons(pictures);
};

bootstrap();
