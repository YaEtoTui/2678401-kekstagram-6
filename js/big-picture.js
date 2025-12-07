import {renderComments} from './big-picture-comments.js';

const closePopUp = function (bigPicture) {

  const iconClose = bigPicture.querySelector('.big-picture__cancel');
  iconClose.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    const body = document.querySelector('.body');
    body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') { // ESC
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      const body = document.querySelector('.body');
      body.classList.remove('modal-open');
    }
  });
};

const renderMainElements = function (bigPicture, pictureData) {
  const img = bigPicture.querySelector('.big-picture__img img');
  img.src = pictureData.url;
  img.alt = pictureData.description;

  const likesCount = bigPicture.querySelector('.likes-count');
  likesCount.textContent = pictureData.likes;

  if (pictureData.comments.length > 0) {
    renderComments(bigPicture, pictureData.comments);
  }

  const description = bigPicture.querySelector('.social__caption');
  description.textContent = pictureData.description;
};

export const renderBigPicture = function (pictureData) {

  const bigPicture = document.querySelector('.big-picture');

  bigPicture.classList.remove('hidden');

  renderMainElements(bigPicture, pictureData);

  closePopUp(bigPicture);

  const body = document.querySelector('.body');
  body.classList.add('modal-open');
};
