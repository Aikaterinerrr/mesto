import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({data, popupSelector}) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  open() {
    super.open();
    super._setEventListeners();

    this._modalImagePicture = this._popup.querySelector('.modal__image');
    this._modalImagePicture.src = this._link;
    this._modalImagePicture.alt = this._name;

    this._modalImageCaption = this._popup.querySelector('.modal__caption');
    this._modalImageCaption.textContent = this._name;
  }

  close() {
    super._close();
    super._removeEventListeners();
  }
}
