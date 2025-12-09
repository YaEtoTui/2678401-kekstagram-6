const SLIDER_MIN = 25;
const SLIDER_MAX = 100;
const STEP = 25;
const PERCENTS_TO_SCALE = 100;

const imageElement = document.querySelector('.img-upload__preview img');
const smallerScale = document.querySelector('.scale__control--smaller');
const biggerScale = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

const changeScale = (scaleValueNumber) => {
  smallerScale.addEventListener('click', () => {
    scaleValueNumber -= STEP;
    if (scaleValueNumber < SLIDER_MIN) {
      scaleValueNumber = SLIDER_MIN;
    }

    scaleValue.value = `${scaleValueNumber}%`;
    imageElement.style.transform = `scale(${scaleValueNumber / PERCENTS_TO_SCALE})`;
  });

  biggerScale.addEventListener('click', () => {
    scaleValueNumber += STEP;
    if (scaleValueNumber > SLIDER_MAX) {
      scaleValueNumber = SLIDER_MAX;
    }

    scaleValue.value = `${scaleValueNumber}%`;
    imageElement.style.transform = `scale(${scaleValueNumber / PERCENTS_TO_SCALE})`;
  });
};

export {changeScale, imageElement, SLIDER_MAX};
