// Находим элемент-контейнер, где находится форма редактирования изображения
const uploadContainer = document.querySelector('.img-upload');
const scaleControlSmallerElement = uploadContainer.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = uploadContainer.querySelector('.scale__control--bigger');
const scaleValueElement = uploadContainer.querySelector('.scale__control--value');
const uploadPreview = uploadContainer.querySelector('.img-upload__preview');
const step = 25;

scaleControlSmallerElement.addEventListener('click', () => {
  let currentSizeValue = +scaleValueElement.value.replace(/\D/g, '');
  if (currentSizeValue > 25) {
    currentSizeValue -= step;
    uploadPreview.style.transform = `scale(${currentSizeValue / 100})`;
    scaleValueElement.value = `${currentSizeValue}%`;
  }
});

scaleControlBiggerElement.addEventListener('click', () => {
  let currentSizeValue = +scaleValueElement.value.replace(/\D/g, '');
  if (currentSizeValue < 100) {
    currentSizeValue += step;
    uploadPreview.style.transform = `scale(${currentSizeValue / 100})`;
    scaleValueElement.value = `${currentSizeValue}%`;
  }
});
