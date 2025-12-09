import {renderComments, socialCommentsList, commentsCountTotal} from './comments.js';
import {isEscapeKey, showModal, hideModal} from './util.js';
import {renderImage} from './picture-open.js';

const COMMENTS_PER_PAGE = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const pictureLinks = document.querySelectorAll('.picture');
const socialCommentShown = document.querySelector('.social__comment-shown');
const commentsLoader = document.querySelector('.comments-loader');

let socialCommentShownCount = Number(socialCommentShown);
let bigImageComments = [];

const onCommentsLoaderClick = () => {
  socialCommentsList.innerHTML = '';
  socialCommentShownCount += COMMENTS_PER_PAGE;
  socialCommentShown.textContent = socialCommentShownCount;

  if (socialCommentShownCount >= Number(commentsCountTotal.textContent)) {
    socialCommentShown.textContent = commentsCountTotal.textContent;
    commentsLoader.classList.add('hidden');
  }

  renderComments(bigImageComments, Number(socialCommentShown.textContent));
};

commentsLoader.addEventListener('click', onCommentsLoaderClick);

const onBigPictureKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideImageModal();
  }
};

const showImageModal = function (pictureData) {
  showModal(bigPicture, onBigPictureKeyDown);

  bigImageComments = pictureData.comments;
  commentsCountTotal.textContent = bigImageComments.length;
  socialCommentsList.innerHTML = '';
  socialCommentShown.textContent = COMMENTS_PER_PAGE;
  socialCommentShownCount = COMMENTS_PER_PAGE;

  commentsLoader.classList.remove('hidden');

  renderImage(pictureData);
  if (Number(commentsCountTotal.textContent) <= COMMENTS_PER_PAGE) {
    socialCommentShown.textContent = commentsCountTotal.textContent;
    commentsLoader.classList.add('hidden');
  }

  renderComments(bigImageComments, Number(socialCommentShown.textContent));
};

function hideImageModal() {
  hideModal(bigPicture, onBigPictureKeyDown);
}

pictureLinks.forEach((pictureLink) => {
  pictureLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    showImageModal(evt);
  });
});

bigPictureClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  hideImageModal();
});

export {showImageModal};
