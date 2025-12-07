const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureLink = pictureTemplate.querySelector('.picture');
const imagesFragment = document.createDocumentFragment();

const createImage = (picture, pictureClickHandler) => {

  const pictureElement = pictureLink.cloneNode(true);

  const img = pictureElement.querySelector('.picture__img');
  img.src = picture.url;
  img.alt = picture.description;

  const likesElement = pictureElement.querySelector('.picture__likes');
  likesElement.textContent = picture.likes;

  const commentsElement = pictureElement.querySelector('.picture__comments');
  commentsElement.textContent = picture.comments.length;

  pictureElement.addEventListener('click', () => {
    pictureClickHandler(picture);
  });

  return pictureElement;
};

export const renderPictures = function (picturesData, pictureClickHandler) {

  picturesData.forEach((picture) => {
    const pictureElement = createImage(picture, pictureClickHandler);
    imagesFragment.append(pictureElement);
  });

  picturesContainer.append(imagesFragment);
};
