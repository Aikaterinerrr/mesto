import Popup from "./Popup.js";
import { validationConfig } from "../utils/utils.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(validationConfig.formSelector);
    this._inputList = this._popup.querySelectorAll(validationConfig.inputSelector);
    this._submitBtn = this._popup.querySelector('.modal__submit-btn');
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

  notifyLoadProgress(inProgress, defaultText) {
    if(inProgress) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = defaultText;
    }
  }

  open() {
    super.open();
    this.setEventListeners();
  }

  close() {
    super._close();
    this.removeEventListeners();
    this._formElement.reset();
  };
}
