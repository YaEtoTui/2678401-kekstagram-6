import {nameList, messageList} from './data.js';
import {generateCommentId, findRandomInteger, countComments, countPhotos} from './util.js';
import {renderBigPicture} from './big-picture.js';

/**
 * Генерируем комментарий
 * @returns {Array<
 *    id: number,
 *    avatar: string,
 *    message: string,
 *    name: string
 *  >}
 */
const generateComment = function () {
  return {
    id: generateCommentId(1, countComments),
    avatar: `img/avatar-${findRandomInteger(1, 6)}.svg`,
    name: nameList[findRandomInteger(0, nameList.length - 1)],
    message: Array.from(
      {length: findRandomInteger(1, 2)},
      () => messageList[findRandomInteger(0, messageList.length - 1)]
    ).join(' '),
  };
};

/**
 * Функция для генерации массива фотографий
 * @returns {Array<{
 *  id: number,
 *  url: string,
 *  description: string,
 *  likes: number,
 *  comments: Array<{
 *    id: number,
 *    avatar: string,
 *    message: string,
 *    name: string
 *  }>
 *  }>}
 */
export const generatePhotoList = function () {

  const photoList = [];
  for (let i = 1; i <= countPhotos; i++) {
    const commentCount = findRandomInteger(0, 30);
    const commentList = Array.from(
      {length: commentCount},
      () => generateComment()
    );

    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Фотография ${i}`,
      likes: findRandomInteger(15, 200),
      comments: commentList,
    };

    photoList.push(photo);
  }

  return photoList;
};


const addPictureClickHandler = function (pictureElement, picture) {
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderBigPicture(picture);
  });
};

const renderPictures = function (picturesData) {

  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  // Создаём DocumentFragment для оптимизации вставки
  const fragment = document.createDocumentFragment();

  picturesData.forEach((picture) => {
    // Клонируем шаблон с дочерними элементами
    const pictureElement = pictureTemplate.cloneNode(true);

    const img = pictureElement.querySelector('.picture__img');
    img.src = picture.url;
    img.alt = picture.description;

    const likesElement = pictureElement.querySelector('.picture__likes');
    likesElement.textContent = picture.likes;

    const commentsElement = pictureElement.querySelector('.picture__comments');
    commentsElement.textContent = picture.comments.length;

    addPictureClickHandler(pictureElement, picture);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

const photoList = generatePhotoList();
renderPictures(photoList);
