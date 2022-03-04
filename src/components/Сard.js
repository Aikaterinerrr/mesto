export default class Card {
  constructor({ data, handleCardClick, handleDelClick, ownerId, addLike, removeLike }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleDelClick = handleDelClick;
    this._cardSelector = cardSelector;
    this._ownerId = ownerId;
    this._addLike = addLike;
    this._removeLike = removeLike;
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

    this._likesCounter = this._element.querySelector('.card__likes-counter');
    this._likesCounter.textContent = this._data.likes.length || '0';

    this._checkOwner();

    this._setEventListeners();

  	return this._element;
  };

  _likesHandler(res) {
    this._cardLikeBtn.classList.toggle('card__like-btn_active');
    this._likesCounter.textContent = res.likes.length;
  }

  _likeCard = () => {
    if(this._cardLikeBtn.classList.contains('card__like-btn_active')) {
      this._removeLike();
    } else {
      this._addLike();
    }
  };

  _removeCard() {
    this._element.remove();
  };

  _checkOwner() {
    if(this._data.owner._id != this._ownerId) {
      this._cardRemoveBtn.style.display = 'none'
    }

    this._data.likes.forEach(elem => {
      if(elem._id === this._ownerId) {
        this._cardLikeBtn.classList.toggle('card__like-btn_active');
      }
    });
  }

  _setEventListeners() {
    this._cardRemoveBtn.addEventListener('click', (evt) => this._handleDelClick(evt));
    this._cardLikeBtn.addEventListener('click', this._likeCard);
    this._cardPhoto.addEventListener('click', () => this._handleCardClick(this._data));
  };
}
