import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._modalImagePicture = this._popup.querySelector('.modal__image');
    this._modalImageCaption = this._popup.querySelector('.modal__caption');
  }

  open(data) {
    super.open();

    this._modalImagePicture.src = data.link;
    this._modalImagePicture.alt = data.name;
    this._modalImageCaption.textContent = data.name;
  }
}
