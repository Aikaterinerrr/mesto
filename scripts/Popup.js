export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  };

  open() {
    this._popup.classList.add('modal_active');
  };

  _close() {
    this._popup.classList.remove('modal_active');
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
    this._popup.addEventListener('click', (evt) => {
      this._handleCloseBtnAndOverlay(evt)
    });
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt);
    });
  };

  _removeEventListeners() {
    this._popup.removeEventListener('click', (evt) => {
      this._handleCloseBtnAndOverlay(evt)
    });
    document.removeEventListener('keyup', (evt) => {
      this._handleEscClose(evt);
    });
  };
}
