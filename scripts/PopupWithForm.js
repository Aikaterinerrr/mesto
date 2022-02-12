import Popup from "./Popup.js";
import { validationConfig } from "./index.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(validationConfig.formSelector);
  };

  getInputValues() {
    this._formValues = {};
    this._formValues.name = this._popup.querySelector('.modal__info_type_place-name').value;
    this._formValues.link = this._popup.querySelector('.modal__info_type_place-image').value;
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
