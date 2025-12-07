import './functions.js';
import {photoList} from './data.js';
import {renderPictures} from './pictures.js';
import {renderBigPicture} from './big-picture.js';
import './form.js';
import './scale.js';
import './effects.js';

const pictureClickHandler = (photosData) => {
  renderBigPicture(photosData);
};

renderPictures(photoList, pictureClickHandler);
