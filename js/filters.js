const imgFilters = document.querySelector('.img-filters');
const imgButtonFilters = document.querySelectorAll('.img-filters__button');

const tokenImgFiltersButtonActive = 'img-filters__button--active';

const changeFilter = (filterButton) => {
  imgButtonFilters.forEach((button) => {
    button.classList.remove(tokenImgFiltersButtonActive);
  });
  filterButton.classList.add(tokenImgFiltersButtonActive);
  return filterButton.id;
};

export {imgFilters, changeFilter, imgButtonFilters};
