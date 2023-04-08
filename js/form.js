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

let message = '';
const imageLoader = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imageLoaderForm = document.querySelector('.img-upload__form');
const imageLoaderFormSubmitButton = imageLoaderForm.querySelector('.img-upload__submit');
const hashtagsField = imageLoaderForm.querySelector('.text__hashtags');
const commentField = imageLoaderForm.querySelector('.text__description');
const closeImageLoaderButton = document.querySelector('#upload-cancel');
const scaleSmaller = imageLoaderForm.querySelector('.scale__control--smaller');
const scaleBigger = imageLoaderForm.querySelector('.scale__control--bigger');
const scaleValue = imageLoaderForm.querySelector('.scale__control--value');
const imagePreview = imageLoaderForm.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
let scaleNumber = DEFAULT_SCALE;
const effects = imageLoaderForm.querySelector('.effects__list');
const sliderElement = imageLoaderForm.querySelector('.effect-level__slider');
const effectLevel = imageLoaderForm.querySelector('.effect-level__value');

export const loadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleValue.value = `${DEFAULT_SCALE}%`;
  scaleNumber = DEFAULT_SCALE;
  image.style = '';
};

export const closeLoaderForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageLoader.value = '';
  imageLoader.file = '';
};

imageLoader.addEventListener('change', loadForm);
closeImageLoaderButton.addEventListener('click', closeLoaderForm); //on Esc needed

const pristine = new Pristine(imageLoaderForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'error',
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

const applyEffect = (effect) => {
  let effectToApply;

  switch (effect) {
    case 'effect-none': effectToApply = 'effects__preview--none'; break;
    case 'effect-chrome': effectToApply = 'effects__preview--chrome'; break;
    case 'effect-sepia': effectToApply = 'effects__preview--sepia'; break;
    case 'effect-marvin': effectToApply = 'effects__preview--marvin'; break;
    case 'effect-phobos': effectToApply = 'effects__preview--phobos'; break;
    case 'effect-heat': effectToApply = 'effects__preview--heat'; break;
  }

  image.className = '';
  image.classList.add(effectToApply);
};

const changeImage = (value) => {
  applyEffect(value.target.id);
};

effects.addEventListener('change', (evt) => {
  changeImage(evt);
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  effectLevel.value = sliderElement.noUiSlider.get();
  console.log(effectLevel.value);
});

// 2.2. Наложение эффекта на изображение:

// По умолчанию должен быть выбран эффект «Оригинал».
// На изображение может накладываться только один эффект.
// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio,
// добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту.
// Например, если выбран эффект .effect-chrome,
// изображению нужно добавить класс effects__preview--chrome.
// Интенсивность эффекта регулируется перемещением ползунка в слайдере.
// Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider.
// Уровень эффекта записывается в поле .effect-level__value.
// При изменении уровня интенсивности эффекта (предоставляется API слайдера),
// CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
// При выборе эффекта «Оригинал» слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
// При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
// слайдер, CSS-стиль изображения и значение поля должны обновляться.
