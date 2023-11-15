// Находим элемент-контейнер, где находится форма редактирования изображения
const uploadContainer = document.querySelector('.img-upload');
const scaleControlSmallerElement = uploadContainer.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = uploadContainer.querySelector('.scale__control--bigger');
const scaleValueElement = uploadContainer.querySelector('.scale__control--value');
const uploadPreview = uploadContainer.querySelector('.img-upload__preview img');
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

const uploadSlider = uploadContainer.querySelector('.effect-level__slider');
const uploadSliderInput = uploadContainer.querySelector('.effect-level__value');
const uploadEffectChrome = uploadContainer.querySelector('#effect-chrome');

uploadSliderInput.value = 100;

noUiSlider.create(uploadSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

uploadSlider.noUiSlider.on('update', () => {
  uploadSliderInput.value = uploadSlider.noUiSlider.get();
  uploadPreview.style.filter = `grayscale(${uploadSlider.noUiSlider.get()})`;
});

uploadEffectChrome.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    uploadSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 10,
      },
      step: 0.1
    });
    uploadSlider.noUiSlider.set(10); // вместо ключа start с начальным значением
  } else {
    uploadSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1
    });
    uploadSlider.noUiSlider.set(100);
  }
});
