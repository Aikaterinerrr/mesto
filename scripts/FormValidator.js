class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
  };

  _showInputError = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () =>  {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableButtonState() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableButtonState() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButtonState();
    } else {
      this._enableButtonState();
    }
  };

  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
  };
};

export default FormValidator;
