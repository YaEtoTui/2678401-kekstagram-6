import {isEscapeKey, showModal, hideModal} from './util.js';
import {resetImageForm} from './reset-form.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './modal-status.js';
import {imageElement} from './scale.js';

const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGULAR = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS_NUMBER = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ErrorMessageType = {
  COMMENT_LENGTH_ERROR: `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`,
  HASHTAGS_INVALID_PATTERN_ERROR: 'Введен невалидный хэштег',
  HASHTAGS_NUMBER_ERROR: 'Превышено количество хэштегов',
  HASHTAGS_REPEAT_ERROR: 'Хэштеги повторяются'
};

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadSubmit = document.querySelector('.img-upload__submit');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const onImageUploadOverlayKeyDown = (evt) => {
  if (isEscapeKey(evt) && commentField !== document.activeElement && hashtagField !== document.activeElement) {
    evt.preventDefault();
    hideImageUploadOverlay();
    resetImageForm(form, pristine);
  }
};

resetImageForm(form, pristine);

const showImageUploadOverlay = () => {
  showModal(overlay, onImageUploadOverlayKeyDown);
};

function hideImageUploadOverlay() {
  hideModal(overlay, onImageUploadOverlayKeyDown);
}

imageUploadInput.addEventListener('change', () => {
  showImageUploadOverlay();

  const file = imageUploadInput.files[0];
  const fileUrl = URL.createObjectURL(file);
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imageElement.src = fileUrl;
    effectsPreviews.forEach((effectsPreview) => {
      effectsPreview.style.backgroundImage = `url("${fileUrl}")`;
    });
  }
});

cancelButton.addEventListener('click', () => {
  hideImageUploadOverlay();
  resetImageForm(form, pristine);
});

const normalizeTags = (value) => value.toLowerCase()
  .trim()
  .replace(/\s+/g, ' ')
  .split(' ');

const validateComment = (value) => value.length < MAX_COMMENT_LENGTH;

const hasValidTags = (value) => {
  const hashtags = normalizeTags(value);
  const hashTagsRegularityCheck = hashtags.some((hashtag) => !HASHTAG_REGULAR.test(hashtag));
  return !hashTagsRegularityCheck || value === '';
};

const hasValidCount = (value) => {
  const hashtags = normalizeTags(value);
  return hashtags.length <= MAX_HASHTAGS_NUMBER;
};

const hasUniqueTags = (value) => {
  const hashtags = normalizeTags(value);
  return new Set(hashtags).size === hashtags.length;
};

pristine.addValidator(commentField, validateComment, ErrorMessageType.COMMENT_LENGTH_ERROR);
pristine.addValidator(hashtagField, hasValidTags, ErrorMessageType.HASHTAGS_INVALID_PATTERN_ERROR);
pristine.addValidator(hashtagField, hasValidCount, ErrorMessageType.HASHTAGS_NUMBER_ERROR);
pristine.addValidator(hashtagField, hasUniqueTags, ErrorMessageType.HASHTAGS_REPEAT_ERROR);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    imageUploadSubmit.disabled = true;
    sendData(new FormData(evt.target))
      .then(() => {
        showSuccessMessage();
        resetImageForm(form, pristine);
      })
      .catch(() => {
        showErrorMessage(showImageUploadOverlay);
      })
      .finally(() => {
        hideImageUploadOverlay();
        imageUploadSubmit.disabled = false;
      });
  }
});
