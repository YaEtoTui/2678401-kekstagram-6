import {SLIDER_MAX, imageElement, changeScale} from './scale.js';

const imageUploadEffectLevelFieldset = document.querySelector('.img-upload__effect-level');
const effectOriginal = document.querySelector('#effect-none');

const resetImageForm = (currentForm, currentFormValidator) => {
  currentFormValidator.reset();
  currentForm.reset();
  changeScale(SLIDER_MAX);
  imageElement.style.transform = 'scale(1)';
  imageElement.style.filter = 'none';
  imageUploadEffectLevelFieldset.classList.add('hidden');
  effectOriginal.checked = true;
};

export {resetImageForm, effectOriginal, imageUploadEffectLevelFieldset};
