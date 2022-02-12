import Popup from "./Popup.js";
import { validationConfig } from "./index.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit  }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(validationConfig.formSelector);
    this._inputList = this._popup.querySelectorAll(validationConfig.inputSelector);
  };

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  };

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
  }

  setEventListeners() {
    super._setEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit);
  };

  removeEventListeners() {
    super._removeEventListeners();
    this._formElement.removeEventListener('submit', this._handleFormSubmit);
  };

  close() {
    super._close();
    this.removeEventListeners();
    this._formElement.reset();
  };
}
