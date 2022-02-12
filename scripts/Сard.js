class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  };

  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return card;
  };

  generateCard() {
    this._element = this._getTemplate();

    this._cardPhoto = this._element.querySelector('.card__card-image');
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    this._cardTitle = this._element.querySelector('.card__card-title');
    this._cardTitle.textContent = this._name;

    this._cardRemoveBtn = this._element.querySelector('.card__remove-btn');
    this._cardLikeBtn = this._element.querySelector('.card__like-btn');

    this._setEventListeners();

  	return this._element;
  };

  _likeCard() {
    this._cardLikeBtn.classList.toggle('card__like-btn_active');
  };

  _removeCard() {
    this._element.remove();
  };

  _setEventListeners() {
    this._cardRemoveBtn.addEventListener('click', () => this._removeCard());
    this._cardLikeBtn.addEventListener('click', () => this._likeCard());
    this._cardPhoto.addEventListener('click', () => this._handleCardClick(this._data));
  };
}

export default Card;
