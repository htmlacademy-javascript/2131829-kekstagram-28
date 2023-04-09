const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_LIMIT = 5;
const MAX_COMMENT_LENGTH = 140;
const ERROR_MESSAGES = {
  badHashtag : 'Хештег должен начинаться с # и содержать только буквы и цифры!',
  longComment : `Комментарий не больше ${MAX_COMMENT_LENGTH} символов!`,
  dublicates : 'Дублирование хештегов запрещено!',
  limitExceeded : `Не более ${HASHTAGS_LIMIT} хештегов!`
};
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;
const DEFAULT_SLIDER = {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
};
const SLIDER_OPTIONS = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,},
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,},
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,},
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,},
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,},
};

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

export const showArticleForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleValue.value = `${DEFAULT_SCALE}%`;
  scaleNumber = DEFAULT_SCALE;
  image.removeAttribute('style');
  sliderContainer.classList.add('hidden');
  hashtagsField.value = '';
  commentField.value = '';
};

export const hideArticleForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageLoader.value = '';
  imageLoader.file = '';
};

const showArticleFormHandler = () => {
  showArticleForm();
};

imageLoader.addEventListener('change', showArticleFormHandler);
closeImageLoaderButton.addEventListener('click', hideArticleForm);

const pristine = new Pristine(imageLoaderForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'validate-error',
}, false);

imageLoaderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const isTagValid = (data) => HASHTAG_REGEXP.test(data);

const isTagsUnique = (data) => {
  const dataSet = new Set(data.map((value) => value.toLowerCase()));

  if (dataSet.size < data.length) {
    return false;
  }

  return true;
};

const isHashtagsValid = (value) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return true;
  }

  const hashtags = trimmedValue
    .split(' ')
    .filter((tag) => tag !== '');

  if (hashtags.length > HASHTAGS_LIMIT) {
    message = ERROR_MESSAGES.limitExceeded;
    return false;
  }

  if (!isTagsUnique(hashtags)) {
    message = ERROR_MESSAGES.dublicates;
    return false;
  }

  for (let i = 0; i < hashtags.length; i ++) {
    if (!isTagValid(hashtags[i])) {
      message = ERROR_MESSAGES.badHashtag;
      return false;
    }
  }

  return true;
};

const isCommentValid = (value) => {
  message = ERROR_MESSAGES.longComment;

  return value.length <= MAX_COMMENT_LENGTH;
};

pristine.addValidator(hashtagsField, isHashtagsValid, () => message);
pristine.addValidator(commentField, isCommentValid, () => message);

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
    hideArticleForm();
  }
});

const transformImage = () => {
  image.style.transform = `scale(${scaleNumber / 100})`;
};

const scaleHandler = (target) => {
  if (target.classList.contains('scale__control--smaller')) {
    scaleNumber -= SCALE_STEP;
  } else if (target.classList.contains ('scale__control--bigger')) {
    scaleNumber += SCALE_STEP;
  }

  if (scaleNumber > MAX_SCALE) {
    scaleNumber = MAX_SCALE;
  }

  if (scaleNumber < MIN_SCALE) {
    scaleNumber = MIN_SCALE;
  }

  scaleValue.value = `${scaleNumber}%`;
  transformImage();
};


scaleBigger.addEventListener('click', (evt) => {
  scaleHandler(evt.target);
});

scaleSmaller.addEventListener('click', (evt) => {
  scaleHandler(evt.target);
});

const applyEffect = (effect) => {
  switch (effect) {
    case 'effect-none': currentEffect = 'none'; break;
    case 'effect-chrome': currentEffect = 'chrome'; break;
    case 'effect-sepia': currentEffect = 'sepia'; break;
    case 'effect-marvin': currentEffect = 'marvin'; break;
    case 'effect-phobos': currentEffect = 'phobos'; break;
    case 'effect-heat': currentEffect = 'heat'; break;
  }

  image.className = '';
  image.classList.add(`effects__preview--${currentEffect}`);
};

noUiSlider.create(sliderElement, DEFAULT_SLIDER);

const configureSlider = () => {
  if (currentEffect === 'none') {
    sliderContainer.classList.add('hidden');
    sliderElement.noUiSlider.updateOptions(DEFAULT_SLIDER);
  } else {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(SLIDER_OPTIONS[currentEffect]);
  }
};

effects.addEventListener('change', (evt) => {
  image.removeAttribute('style');
  applyEffect(evt.target.id);
  configureSlider();
});

const getFilterValue = (value) => {
  switch (currentEffect) {
    case 'chrome': return `grayscale(${(value)})`;
    case 'sepia': return `sepia(${value})`;
    case 'marvin': return `invert(${value}%)`;
    case 'phobos': return `blur(${value}px)`;
    case 'heat': return `brightness(${value})`;
    default: return '';
  }
};

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();

  effectLevel.value = value;
  image.style.filter = getFilterValue(value);
});
