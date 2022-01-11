const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__info',
  submitButtonSelector: '.modal__submit-btn',
  inactiveButtonClass: 'modal__submit-btn_inactive',
  inputErrorClass: 'modal__info_type_error',
  errorClass: 'modal__input-error'
}

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function disableButtonState(buttonElement, disableButtonClass) {
  buttonElement.classList.add(disableButtonClass);
  buttonElement.disabled = true;
};

function enableButtonState(buttonElement, disableButtonClass) {
  buttonElement.classList.remove(disableButtonClass);
  buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    disableButtonState(buttonElement, validationConfig.inactiveButtonClass);
  } else {
    enableButtonState(buttonElement, validationConfig.inactiveButtonClass)
  }
}

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  })
};

enableValidation(validationConfig);
