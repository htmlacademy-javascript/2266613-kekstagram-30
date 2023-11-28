const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const uploadContainer = document.querySelector('.img-upload');
const uploadPreviewElement = uploadContainer.querySelector('.img-upload__preview img');
const scaleControlSmallerElement = uploadContainer.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = uploadContainer.querySelector('.scale__control--bigger');
const scaleValueElement = uploadContainer.querySelector('.scale__control--value');

const scaleImage = (value) => {
  uploadPreviewElement.style.transform = `scale(${value / 100})`;
  scaleValueElement.value = `${value}%`;
};

const onScaleControlSmallerElementClick = () => {
  scaleImage(
    Math.max(parseInt(scaleValueElement.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onScaleControlBiggerElementClick = () => {
  scaleImage(
    Math.min(parseInt(scaleValueElement.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

scaleControlSmallerElement.addEventListener('click', onScaleControlSmallerElementClick);
scaleControlBiggerElement.addEventListener('click', onScaleControlBiggerElementClick);

export { resetScale };
