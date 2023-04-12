const ERROR_SHOW_TIME = 7000;

const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    const modal = document.body.lastElementChild;

    if (modal.classList.contains('success') || modal.classList.contains('error')) {
      modal.remove();
      document.removeEventListener('click', onDocumentKeydown);
    }
  }
};

const onDocumentClick = (evt) => {
  if (evt.target.classList.contains('success') || evt.target.classList.contains('error')) {
    evt.target.remove();
    document.removeEventListener('click', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }
};


export const showAlert = (type) => {
  let alert;

  if (type === 'success') {
    alert = successTemplate.cloneNode(true);
    document.body.append(alert);

    const successMessage = document.querySelector('.success');
    const successButton = successMessage.querySelector('.success__button');

    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
    successButton.addEventListener('click', () => {
      successMessage.remove();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeydown);
    });
  } else if (type === 'error') {
    alert = errorTemplate.cloneNode(true);
    document.body.append(alert);

    const errorMessage = document.querySelector('.error');
    const errorButton = errorMessage.querySelector('.error__button');

    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
    errorButton.addEventListener('click', () => {
      errorMessage.remove();
      document.addEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeydown);
    });
  }
};

export const showErrorMessage = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.classList.add('alert');
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ERROR_SHOW_TIME);
};
