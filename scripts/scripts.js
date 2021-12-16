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
let placeImage = document.querySelector('.modal__info_type_place-image');

let profileUserName = document.querySelector('.profile__user-name');
let profileDescription = document.querySelector('.profile__description');

let elementsCards = document.querySelector('.elements__cards');
let elementsTemplate = document.querySelector('.elements__template');

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

function removeCard(elem) {
  elem.remove()
};

function likeCard(elem) {
  elem.classList.toggle('card__like-btn_active');
  elem.classList.toggle('card__like-btn');
};

initialCards.forEach(function (elem) {
  const newPhoto = elementsTemplate.content.cloneNode(true).querySelector('.card');
  elementsCards.append(newPhoto);
  newPhoto.querySelector('.card__card-image').src = elem.link;
  newPhoto.querySelector('.card__card-image').alt = elem.name;
  newPhoto.querySelector('.card__card-title').textContent = elem.name;
  let cardRemove = newPhoto.querySelector('.card__remove-btn');
  cardRemove.addEventListener('click', () => removeCard(newPhoto));
  let likeButton = newPhoto.querySelector('.card__like-btn');
  likeButton.addEventListener('click', () => likeCard(likeButton));
});

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

function closeModalEdit() {
  closeModal(modalEdit);
};

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(modalEdit);
};

function openModalAdd() {
  openModal(modalAdd);
  placeInput.value = '';
  placeImage.value = '';
};

function closeModalAdd() {
  closeModal(modalAdd);
};

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const newPhoto = elementsTemplate.content.cloneNode(true).querySelector('.card');
  newPhoto.querySelector('.card__card-image').src = placeImage.value;
  newPhoto.querySelector('.card__card-title').textContent = placeInput.value;
  elementsCards.prepend(newPhoto);
  closeModal(modalAdd);
  let cardRemove = newPhoto.querySelector('.card__remove-btn');
  cardRemove.addEventListener('click', () => removeCard(newPhoto));
  let likeButton = newPhoto.querySelector('.card__like-btn');
  likeButton.addEventListener('click', () => likeCard(likeButton));
};

editButton.addEventListener('click', openModalEdit);
addButton.addEventListener('click', openModalAdd);
closeEditButton.addEventListener('click', closeModalEdit);
closeAddButton.addEventListener('click', closeModalAdd);
editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
