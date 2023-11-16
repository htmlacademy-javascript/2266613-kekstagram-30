const effects = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [effects.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [effects.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [effects.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [effects.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [effects.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [effects.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [effects.HEAT]: {
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

let chosenEffect = effects.DEFAULT;

const isDefault = () => chosenEffect === effects.DEFAULT;

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
  setEffect(effects.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsElement.addEventListener('change', onEffectsChange);
};

export { init, reset };
