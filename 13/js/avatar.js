const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const uploadPreview = document.querySelector('.img-upload__preview img');

const initFileChooser = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      uploadPreview.src = URL.createObjectURL(file);
    }
  });
};


export { initFileChooser };
