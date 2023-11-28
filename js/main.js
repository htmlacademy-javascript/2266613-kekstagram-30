import { getData } from './api.js';
import { renderGallery } from './render-gallery.js';
import { pressFilterButtons } from './sort.js';
import { initUploadForm } from './upload-form.js';


const bootstrap = async () => {
  initUploadForm();
  const pictures = await getData();
  renderGallery(pictures);
  pressFilterButtons(pictures);
};

bootstrap();
