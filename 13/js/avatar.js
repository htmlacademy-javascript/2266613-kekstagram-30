const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const uploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const initFileChooser = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      uploadPreview.src = URL.createObjectURL(file);
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url('${uploadPreview.src}')`;
      });
    }
  });
};


export { initFileChooser };
