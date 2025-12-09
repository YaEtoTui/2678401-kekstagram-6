import './functions.js';
import {getData} from './api.js';
import {renderPictures} from './pictures.js';
import {showImageModal} from './big-picture.js';
import './form.js';
import './scale.js';
import './effects.js';
import {imgFilters} from './filters.js';
import {sortImgList} from './img-sort.js';

const onPhotoClick = (photosData) => {
  showImageModal(photosData);
};

getData()
  .then((pictures) => {
    renderPictures(pictures, onPhotoClick);
    sortImgList(pictures, onPhotoClick);
    imgFilters.classList.remove('img-filters--inactive');
  });
