import {imageElement} from './scale.js';
import {effectOriginal, imageUploadEffectLevelFieldset} from './reset-form.js';

const SLIDER_MIN = 0;
const SLIDER_MAX = 1;
const DEFAULT_STEP = 1;
const STEP = 0.1;

const effectsRadioInputs = document.querySelectorAll('.effects__radio:not(#effect-none)');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectSliderContainer = document.querySelector('.effect-level__slider');

noUiSlider.create(effectSliderContainer, {
  range: {
    min: SLIDER_MIN,
    max: SLIDER_MAX,
  },
  start: DEFAULT_STEP,
  step: STEP,
  connect: 'lower'
});

for (const effectInput of effectsRadioInputs) {
  effectInput.addEventListener('change', (evt) => {
    imageUploadEffectLevelFieldset.classList.remove('hidden');
    effectSliderContainer.noUiSlider.updateOptions({
      range: {
        min: parseFloat(evt.target.dataset.min),
        max: parseFloat(evt.target.dataset.max)
      },
      start: parseFloat(evt.target.dataset.max),
      step: parseFloat(evt.target.dataset.step),
      format: {
        to: (value) => Number.isInteger(Number(value.toFixed(1))) ? value.toFixed(0) : value.toFixed(1),
        from: (value) => parseFloat(value)
      }
    });

    effectSliderContainer.noUiSlider.on('update', () => {
      imageElement.style.filter = `${effectInput.dataset.effect}(${effectSliderContainer.noUiSlider.get()}${effectInput.dataset.measure})`;
      effectLevelValue.value = effectSliderContainer.noUiSlider.get();
    });
  });
}

effectOriginal.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imageElement.style.filter = 'none';
    imageUploadEffectLevelFieldset.classList.add('hidden');
    effectLevelValue.value = '';
  }
});
