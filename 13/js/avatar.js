const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('#upload-file');
const uploadPreviewElement = document.querySelector('.img-upload__preview img');
const effectsPreviewElement = document.querySelectorAll('.effects__preview');

const initFileChooser = () => {
  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      uploadPreviewElement.src = URL.createObjectURL(file);
      effectsPreviewElement.forEach((preview) => {
        preview.style.backgroundImage = `url('${uploadPreviewElement.src}')`;
      });
    }
  });
};


export { initFileChooser };
