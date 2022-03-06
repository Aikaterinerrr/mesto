import Popup from "./Popup.js";
import { validationConfig } from "../utils/utils.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(validationConfig.formSelector);
    this._submitBtn = this._formElement.querySelector(validationConfig.submitButtonSelector);
    this._inputList = this._formElement.querySelectorAll(validationConfig.inputSelector);
  };

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  };

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
  }

  _setEventListeners() {
    super._setEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit);
  };

  _removeEventListeners() {
    super._removeEventListeners();
    this._formElement.removeEventListener('submit', this._handleFormSubmit);
  };

  notifyLoadProgress(inProgress, defaultText) {
    if (inProgress) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = defaultText;
    }
  }

  close() {
    super.close();
    this._formElement.reset();
  };
}
