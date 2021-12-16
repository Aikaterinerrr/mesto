let editButton = document.querySelector('.profile__edit-btn');
let addButton = document.querySelector('.profile__add-btn');

let modalEdit = document.querySelector('.modal_type_edit');
let modalAdd = document.querySelector('.modal_type_add');
let modalImage = document.querySelector('.modal_type_image');

let closeEditButton = document.querySelector('.modal__close-btn_type_modal-edit-close');
let closeAddButton = document.querySelector('.modal__close-btn_type_modal-add-close');
let closeImageButton = document.querySelector('.modal__close-btn_type_modal-image-close');

let editFormElement = document.querySelector('.modal__form_type_edit-form');
let addFormElement = document.querySelector('.modal__form_type_add-form');

let nameInput = document.querySelector('.modal__info_type_user-name');
let jobInput = document.querySelector('.modal__info_type_user-job');

let placeInput = document.querySelector('.modal__info_type_place-name');
let placeImageInput = document.querySelector('.modal__info_type_place-image');

let profileUserName = document.querySelector('.profile__user-name');
let profileDescription = document.querySelector('.profile__description');

let elementsCards = document.querySelector('.elements__cards');
let elementsTemplate = document.querySelector('.elements__template');

let modalImagePicture = document.querySelector('.modal__image');
let modalImageCaption = document.querySelector('.modal__caption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

addInitialCards();

function openModal(modal) {
  modal.classList.add('modal_active');
};

function closeModal(modal) {
  modal.classList.remove('modal_active')
};

function openModalEdit() {
  openModal(modalEdit);
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileDescription.textContent;
};

function openModalAdd() {
  openModal(modalAdd);
  placeInput.value = '';
  placeImageInput.value = '';
};

function openModalImage(elem) {
  openModal(modalImage);
  modalImagePicture.src = elem.link;
  modalImagePicture.alt = elem.name;
  modalImageCaption.textContent = elem.name;
};

function closeModalEdit() {
  closeModal(modalEdit);
};

function closeModalAdd() {
  closeModal(modalAdd);
};

function closeModalImage() {
  closeModal(modalImage);
};

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModalEdit();
};

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardToAdd = {
    name: placeInput.value,
    link: placeImageInput.value
  };
  addCard(cardToAdd);
  closeModalAdd();
}

function removeCard(elem) {
  elem.remove()
};

function likeCard(elem) {
  elem.classList.toggle('card__like-btn_active');
  elem.classList.toggle('card__like-btn');
};

function produceCard(elem) {
  let card = elementsTemplate.content.cloneNode(true).querySelector('.card');
  let cardPhoto = card.querySelector('.card__card-image');
  cardPhoto.src = elem.link;
  cardPhoto.alt = elem.name
  let cardTitle = card.querySelector('.card__card-title');
  cardTitle.textContent = elem.name;

  let cardRemove = card.querySelector('.card__remove-btn');
  cardRemove.addEventListener('click', () => removeCard(card));
  let likeButton = card.querySelector('.card__like-btn');
  likeButton.addEventListener('click', () => likeCard(likeButton));
  cardPhoto.addEventListener('click', () => openModalImage(elem));
  return card;
}

function addCard(elem) {
  let card = produceCard(elem);
  elementsCards.prepend(card);
}

function addInitialCards() {
  initialCards.forEach((elem) => addCard(elem));
}

editButton.addEventListener('click', openModalEdit);
addButton.addEventListener('click', openModalAdd);

closeEditButton.addEventListener('click', closeModalEdit);
closeAddButton.addEventListener('click', closeModalAdd);
closeImageButton.addEventListener('click', closeModalImage);

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
