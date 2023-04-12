import {sendData} from './load.js';
import {showAlert} from './dialog.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
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
const DEFAULT_SLIDER_CONFIG = {
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
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
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
const submitButton = imageLoaderForm.querySelector('#upload-submit');

let activeFilter;
let scaleNumber;

const turnSubmitButton = (action) => {
  if (action === 'on') {
    submitButton.disabled = false;
  } else if (action === 'off') {
    submitButton.disabled = true;
  }
};

const setImageScale = (value) => {
  scaleValue.value = `${value}%`;
  image.style.transform = `scale(${value / 100})`;
};

const resetForm = () => {
  setImageScale(DEFAULT_SCALE);
  scaleNumber = DEFAULT_SCALE;
  activeFilter = 'none';
  image.removeAttribute('style');
  image.removeAttribute('class');
  hashtagsField.value = '';
  commentField.value = '';
};

const hideArticleForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();
  imageLoader.value = '';
  imageLoader.file = '';
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    hideArticleForm();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

export const showArticleForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  sliderContainer.classList.add('hidden');
  resetForm();

  document.addEventListener('keydown', onDocumentKeydown);
};

const onImageLoaderChange = () => {
  const file = imageLoader.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    image.src = URL.createObjectURL(file);
  }

  showArticleForm();
};

const onCloseImageLoaderButtonClick = () => {
  hideArticleForm();
  document.removeEventListener('keydown', onDocumentKeydown);
};

imageLoader.addEventListener('change', onImageLoaderChange);
closeImageLoaderButton.addEventListener('click', onCloseImageLoaderButtonClick);

const pristine = new Pristine(imageLoaderForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'validate-error',
}, false);

const parseHashtags = (value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return '';
  }

  return trimmedValue.split(/\s+/);
};

const onSuccess = () => {
  showAlert('success');
  hideArticleForm();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onError = () => {
  showAlert('error');
};

imageLoaderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    turnSubmitButton('off');
    const data = new FormData(imageLoaderForm);

    sendData(data)
      .then(onSuccess)
      .finally(() => {
        turnSubmitButton('on');
      })
      .catch(onError);
  }
});

const isTagValid = (data) => HASHTAG_REGEXP.test(data);

const isTagsValid = () => {
  const tags = parseHashtags(hashtagsField.value);

  for (const tag of tags) {
    if (!isTagValid(tag)) {
      return false;
    }
  }

  return true;
};

const isTagsUnique = () => {
  const tags = parseHashtags(hashtagsField.value);

  if (!tags.length) {
    return true;
  }

  const dataSet = new Set(tags.map((value) => value.toLowerCase()));

  return dataSet.size === tags.length;
};

const isTagsCountValid = () => {
  const tags = parseHashtags(hashtagsField.value);

  return tags.length <= HASHTAGS_LIMIT;
};

const isCommentValid = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagsField, isTagsCountValid, ERROR_MESSAGES.limitExceeded, 1, true);
pristine.addValidator(hashtagsField, isTagsUnique, ERROR_MESSAGES.dublicates, 1, true);
pristine.addValidator(hashtagsField, isTagsValid, ERROR_MESSAGES.badHashtag, 1, true);
pristine.addValidator(commentField, isCommentValid, ERROR_MESSAGES.longComment, 1, true);

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

const scaleHandler = (evt) => {
  const target = evt.target;

  if (target === scaleBigger) {
    scaleNumber = Math.min(scaleNumber + SCALE_STEP, MAX_SCALE);
    setImageScale(scaleNumber);
  }

  if (target === scaleSmaller) {
    scaleNumber = Math.max(scaleNumber - SCALE_STEP, MIN_SCALE);
    setImageScale(scaleNumber);
  }
};

scaleBigger.addEventListener('click', scaleHandler);
scaleSmaller.addEventListener('click', scaleHandler);

const setFilter = (filterType) => {
  activeFilter = filterType.replace('effect-', '');
  image.className = '';
  image.classList.add(`effects__preview--${activeFilter}`);
};

noUiSlider.create(sliderElement, DEFAULT_SLIDER_CONFIG);

const setSlideConfig = (filter) => {
  if (filter === 'none') {
    sliderContainer.classList.add('hidden');
    sliderElement.noUiSlider.updateOptions(DEFAULT_SLIDER_CONFIG);
  } else {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(SLIDER_OPTIONS[filter]);
  }
};

const onFilterChange = (evt) => {
  image.removeAttribute('style');
  setFilter(evt.target.id);
  setSlideConfig(activeFilter);
};

effects.addEventListener('change', onFilterChange);

const getFilterValue = (value) => {
  switch (activeFilter) {
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

