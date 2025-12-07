import {showModal, hideModal, isEscapeKey} from './util.js';
import {resetImageForm} from './reset-form.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const ErrorText = {
  COMMENT_LENGTH_ERROR: `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`,
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег'
};

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const imageUploadInput = document.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTO: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const normalizeTags = (tagString) => tagString
  .trim()
  .replace(/\s+/g, ' ')
  .split(' ');

const validateComment = (value) => value.length < MAX_COMMENT_LENGTH;

const hasValidTags = (value) => {
  const hashtagsArray = value.split(' ');
  const hashTagsRegularityCheck = hashtagsArray.some((hashtag) => !VALID_SYMBOLS.test(hashtag));
  return !hashTagsRegularityCheck;
};

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(commentField, validateComment, ErrorText.COMMENT_LENGTH_ERROR);
pristine.addValidator(hashtagField, hasValidCount, ErrorText.INVALID_COUNT);
pristine.addValidator(hashtagField, hasUniqueTags, ErrorText.NOT_UNIQUE);
pristine.addValidator(hashtagField, hasValidTags, ErrorText.INVALID_PATTERN);

const onImageUploadOverlayKeyDown = (evt) => {
  if (isEscapeKey(evt) && commentField !== document.activeElement && hashtagField !== document.activeElement) {
    evt.preventDefault();
    hideImageUploadOverlay();
    resetImageForm(form, pristine);
  }
};

const showImageUploadOverlay = () => {
  showModal(overlay, onImageUploadOverlayKeyDown);
};

resetImageForm(form, pristine);

function hideImageUploadOverlay() {
  hideModal(overlay, onImageUploadOverlayKeyDown);
  resetImageForm(form, pristine);
}

imageUploadInput.addEventListener('change', () => {
  showImageUploadOverlay();
});

cancelButton.addEventListener('click', () => {
  hideImageUploadOverlay();
  resetImageForm(form, pristine);
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    resetImageForm(form, pristine);
    hideImageUploadOverlay();
  }
});
