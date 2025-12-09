import {changeFilter, imgButtonFilters} from './filters.js';
import {renderPictures} from './pictures.js';
import {sortRandomArray, debounce} from './util.js';

const SORT_IMG_DELAY = 500;
const RANDOM_IMG_COUNT = 10;
const sortArrayByComments = (a, b) => b.comments.length - a.comments.length;

const renderByFilter = (filterType, pictures, onPictureClick) => {
  let sortingPictures = pictures;
  switch (filterType) {
    case 'filter-random':
      sortingPictures = sortRandomArray(pictures.slice()).slice(0, RANDOM_IMG_COUNT);
      break;
    case 'filter-discussed':
      sortingPictures = pictures.slice().sort(sortArrayByComments);
      break;
    default:
      sortingPictures = pictures;
      break;
  }
  renderPictures(sortingPictures, onPictureClick);
};

const sortImgList = (pictures, onPictureClick) => {
  imgButtonFilters.forEach((filterButton) => {
    const renderImagesByFilterWithTimeOut = debounce(renderByFilter, SORT_IMG_DELAY);
    filterButton.addEventListener('click', () => {
      const filterType = changeFilter(filterButton);
      renderImagesByFilterWithTimeOut(filterType, pictures, onPictureClick);
    });
  });
};

export {sortImgList};
