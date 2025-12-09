const bigPicture = document.querySelector('.big-picture');
const img = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const description = bigPicture.querySelector('.social__caption');

export const renderImage = (pictureData) => {
  img.src = pictureData.url;
  img.alt = pictureData.description;
  likesCount.textContent = pictureData.likes;
  description.textContent = pictureData.description;
};
