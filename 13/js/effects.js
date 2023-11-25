const Effects = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [Effects.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effects.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effects.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effects.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effects.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [Effects.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effects.HEAT]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
};

const uploadContainer = document.querySelector('.img-upload');
const uploadPreview = uploadContainer.querySelector('.img-upload__preview img');
const uploadSliderContainer = uploadContainer.querySelector('.img-upload__effect-level');
const uploadSliderInput = uploadContainer.querySelector('.effect-level__value');
const uploadSlider = uploadContainer.querySelector('.effect-level__slider');
const effectsElement = uploadContainer.querySelector('.effects');

let chosenEffect = Effects.DEFAULT;

const isDefault = () => chosenEffect === Effects.DEFAULT;

const setPreviewStyle = () => {
  if (isDefault()) {
    uploadPreview.style.filter = null;
    return;
  }

  const { value } = uploadSliderInput;
  const { style, unit } = effectToFilter[chosenEffect];
  uploadPreview.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  uploadSliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  uploadSliderContainer.classList.add('hidden');
};

const onSliderUpdate = () => {
  uploadSliderInput.value = uploadSlider.noUiSlider.get();
  setPreviewStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(uploadSlider, {
    range: { min, max },
    start: max,
    step,
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

  uploadSlider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  uploadSlider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = () =>{
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setPreviewStyle();
};

const reset = () => {
  setEffect(Effects.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsElement.addEventListener('change', onEffectsChange);
};

export { init, reset };