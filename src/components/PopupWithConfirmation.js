import Popup from "./Popup";
import { validationConfig } from "../utils/utils.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(validationConfig.formSelector);
  }

  _handleDeleteCard = (evt) => {
    this._deleteCard(evt);
  }

  setSubmitHandler(submit) {
    this._deleteCard = submit;
    this._formElement.addEventListener('submit', this._handleDeleteCard)
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._formElement.removeEventListener('submit', this._handleDeleteCard)
  }
}
