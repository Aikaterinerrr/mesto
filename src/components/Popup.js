export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseBtnAndOverlay = this._handleCloseBtnAndOverlay.bind(this);
  };

  open() {
    this._popup.classList.add('modal_active');
    this._setEventListeners();
  };

  close() {
    this._popup.classList.remove('modal_active');
    this._removeEventListeners();
  };

  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.close();
    }
  };

  _handleCloseBtnAndOverlay(evt) {
    if (evt.target.classList.contains('modal__overlay') || evt.target.classList.contains('modal__close-btn')) {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleCloseBtnAndOverlay);
    document.addEventListener('keyup', this._handleEscClose);
  };

  _removeEventListeners() {
    this._popup.removeEventListener('mousedown', this._handleCloseBtnAndOverlay);
    document.removeEventListener('keyup', this._handleEscClose)
  };
}
