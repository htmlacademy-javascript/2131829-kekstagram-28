const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_LIMIT = 5;
const ERROR_MESSAGES = {
  badHashtag : 'Хештег должен начинаться с # и содержать только буквы и цифры!',
  longComment : 'Комментарий не больше 140 символов!',
  dublicates : 'Дублирование хештегов запрещено!',
  limitExceeded : `Не более ${HASHTAGS_LIMIT} хештегов!`
};
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;
const imageLoader = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imageLoaderForm = document.querySelector('.img-upload__form');
const hashtagsField = imageLoaderForm.querySelector('.text__hashtags');
const commentField = imageLoaderForm.querySelector('.text__description');
const closeImageLoaderButton = document.querySelector('#upload-cancel');
const scaleSmaller = imageLoaderForm.querySelector('.scale__control--smaller');
const scaleBigger = imageLoaderForm.querySelector('.scale__control--bigger');
const scaleValue = imageLoaderForm.querySelector('.scale__control--value');
const imagePreview = imageLoaderForm.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const effects = imageLoaderForm.querySelector('.effects__list');
const sliderElement = imageLoaderForm.querySelector('.effect-level__slider');
const effectLevel = imageLoaderForm.querySelector('.effect-level__value');
const sliderContainer = imageLoaderForm.querySelector('.img-upload__effect-level');

let currentEffect = 'none';
let scaleNumber = DEFAULT_SCALE;
let message = '';

export const renderLoaderForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleValue.value = `${DEFAULT_SCALE}%`;
  scaleNumber = DEFAULT_SCALE;
  image.style = '';
  sliderContainer.classList.add('hidden');
  hashtagsField.value = '';
  commentField.value = '';
};

export const closeLoaderForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageLoader.value = '';
  imageLoader.file = '';
};

imageLoader.addEventListener('change', renderLoaderForm);
closeImageLoaderButton.addEventListener('click', closeLoaderForm);

const pristine = new Pristine(imageLoaderForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'validate-error',
}, false);

imageLoaderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const checkHashtag = (data) => HASHTAG_REGEXP.test(data);

const haveDublicates = (data) => {
  for (let i = 0; i < data.length - 1; i++) {
    const testData = data.map((value) => value.toLowerCase());

    if (testData.splice(i, 1).includes(data[i].toLowerCase())) {
      return true;
    }
  }

  return false;
};

function validateHashtags (value) {
  if (!value) {
    return true;
  }

  const hashtags = value.trim().split(' '); //не знаю как быть, если теги разделены несколькими пробелами

  if (hashtags.length > HASHTAGS_LIMIT) {
    message = ERROR_MESSAGES.limitExceeded;
    return false;
  }

  if (haveDublicates(hashtags)) {
    message = ERROR_MESSAGES.dublicates;
    return false;
  }

  for (let i = 0; i < hashtags.length; i ++) {
    if (!checkHashtag(hashtags[i])) {
      message = ERROR_MESSAGES.badHashtag;
      return false;
    }
  }

  return true;
}

function validateComment (value) {
  message = ERROR_MESSAGES.longComment;
  return value.length <= 140;
}

pristine.addValidator(hashtagsField, validateHashtags, () => message);
pristine.addValidator(commentField, validateComment, () => message);

hashtagsField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

commentField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeLoaderForm();
  }
});

const scaleUp = () => {
  scaleNumber += 25;
};

const scaleDown = () => {
  scaleNumber -= 25;
};

const transformImage = () => {
  image.style.transform = `scale(${scaleNumber / 100})`;
};

const makeScale = () => {
  if (scaleNumber > MAX_SCALE) {
    scaleNumber = MAX_SCALE;
  }

  if (scaleNumber < MIN_SCALE) {
    scaleNumber = MIN_SCALE;
  }

  scaleValue.value = `${scaleNumber}%`;
  transformImage();
};

const scaleImageUp = () => {
  scaleUp();
  makeScale();
};

const scaleImageDown = () => {
  scaleDown();
  makeScale();
};

scaleBigger.addEventListener('click', scaleImageUp);
scaleSmaller.addEventListener('click', scaleImageDown);

const detectEffect = (effect) => {
  switch (effect) {
    case 'effect-none': currentEffect = 'none'; break;
    case 'effect-chrome': currentEffect = 'chrome'; break;
    case 'effect-sepia': currentEffect = 'sepia'; break;
    case 'effect-marvin': currentEffect = 'marvin'; break;
    case 'effect-phobos': currentEffect = 'phobos'; break;
    case 'effect-heat': currentEffect = 'heat'; break;
  }

  return currentEffect;
};

const applyEffect = (effect) => {
  image.className = '';
  image.classList.add(`effects__preview--${detectEffect(effect)}`);
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

const configureSlider = () => {
  if (currentEffect !== 'none') {
    sliderContainer.classList.remove('hidden');
  }

  switch (currentEffect) {
    case 'none':
      sliderContainer.classList.add('hidden');
      break;
    case 'chrome': sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }); break;
    case 'sepia': sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }); break;
    case 'marvin': sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    }); break;
    case 'phobos': sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }); break;
    case 'heat': sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }); break;
  }
};

effects.addEventListener('change', (evt) => {
  //image.style = '';
  applyEffect(evt.target.id);
  configureSlider();
});

const calculateFilter = (value) => {
  let filter;

  switch (currentEffect) {
    case 'none': break;
    case 'chrome': filter = `grayscale(${(value)})`; break;
    case 'sepia': filter = `sepia(${value})`; break;
    case 'marvin': filter = `invert(${value}%)`; break;
    case 'phobos': filter = `blur(${value}px)`; break;
    case 'heat': filter = `brightness(${value})`; break;
  }

  return filter;
};

sliderElement.noUiSlider.on('update', () => {
  effectLevel.value = sliderElement.noUiSlider.get();
  image.style.filter = calculateFilter(effectLevel.value);
});
