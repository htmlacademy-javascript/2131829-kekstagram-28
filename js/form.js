//form class="img-upload__form"

export const imageLoader = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const documentBody = document.querySelector('body');
const imageLoaderForm = document.querySelector('.img-upload__form');
const imageLoaderFormSubmitButton = imageLoaderForm.querySelector('.img-upload__submit');

export const loadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  documentBody.classList.add('modal-open');
};

export const closeLoaderForm = () => {
  imgUploadOverlay.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  imageLoader.value = '';
  imageLoader.file = '';
};

/*
Напишите код для валидации формы добавления изображения,
используя библиотеку Pristine (/vendor/pristine). Список полей для валидации:

    Хэш-теги
    Комментарий

Реализуйте логику проверки так, чтобы, как минимум,
она срабатывала при попытке отправить форму и не давала этого сделать,
если форма заполнена не по правилам.
При желании, реализуйте проверки сразу при вводе значения в поле.
*/

// const pristine = new Pristine(imageLoaderForm, {
//   classTo: 'img-upload__field-wrapper',
//   errorClass: 'img-upload__field-wrapper--invalid',
//   successClass: 'img-upload__field-wrapper--valid',
//   errorTextParent: 'form__item',
//   errorTextTag: 'span',
//   errorTextClass: 'form__error'
// }, false);

// imageLoaderFormSubmitButton.addEventListener('click', () => {
//   pristine.validate();
//   console.log('submit');
// });

const pristine = new Pristine(imageLoaderForm, {
  classTo: 'setup-wizard-form__element',
  errorTextParent: 'setup-wizard-form__element',
  errorTextClass: 'setup-wizard-form__error-text',
});

imageLoaderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
