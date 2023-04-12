const ERROR_SHOW_TIME = 7000;

const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;

export const showAlert = (template) => {
  const alert = template.cloneNode(true);

  document.body.append(alert);
};

export const showSuccess = () => {
  showAlert(successTemplate);
};

export const showError = () => {
  showAlert(errorTemplate);
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
