import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success');
const successMessage = successTemplate.content.querySelector('.success');
const successButton = successTemplate.content.querySelector('.success__button');
const errorTemplate = document.querySelector('#error');
const errorMessage = errorTemplate.content.querySelector('.error');
const errorButton = errorTemplate.content.querySelector('.error__button');

const onMessageKeyDown = (currentElement, onClose) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage(currentElement, onClose);
  }
};

const onRegionClick = (currentElement, onClose) => (evt) => {
  if (!currentElement.children[0].contains(evt.target)) {
    hideMessage(currentElement, onClose);
  }
};

let onMessageKeyDownCallback;
let onClickCallback;

const showMessage = (currentMessage, onClose) => {
  onMessageKeyDownCallback = onMessageKeyDown(currentMessage, onClose);
  onClickCallback = onRegionClick(currentMessage, onClose);
  document.body.append(currentMessage);
  document.addEventListener('keydown', onMessageKeyDownCallback);
  document.addEventListener('click', onClickCallback);
};

function hideMessage(currentMessage, onClose) {
  currentMessage.remove();
  if (onClose !== undefined) {
    onClose();
  }
  document.removeEventListener('keydown', onMessageKeyDownCallback);
  document.removeEventListener('click', onClickCallback);
}

const showSuccessMessage = () => {
  showMessage(successMessage);

  successButton.addEventListener('click', () => {
    hideMessage(successMessage);
  });
};

const showErrorMessage = (onClose) => {
  showMessage(errorMessage, onClose);

  errorButton.addEventListener('click', () => {
    hideMessage(errorMessage, onClose);
  });
};

export {showSuccessMessage, showErrorMessage};
