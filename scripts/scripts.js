const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');

const modalEdit = document.querySelector('.modal_type_edit');
const modalAdd = document.querySelector('.modal_type_add');
const modalImage = document.querySelector('.modal_type_image');

const closeEditButton = document.querySelector('.modal__close-btn_type_modal-edit-close');
const closeAddButton = document.querySelector('.modal__close-btn_type_modal-add-close');
const closeImageButton = document.querySelector('.modal__close-btn_type_modal-image-close');

const editFormElement = document.querySelector('.modal__form_type_edit-form');
const addFormElement = document.querySelector('.modal__form_type_add-form');

const nameInput = document.querySelector('.modal__info_type_user-name');
const jobInput = document.querySelector('.modal__info_type_user-job');

const placeInput = document.querySelector('.modal__info_type_place-name');
const placeImageInput = document.querySelector('.modal__info_type_place-image');

const profileUserName = document.querySelector('.profile__user-name');
const profileDescription = document.querySelector('.profile__description');

const elementsCards = document.querySelector('.elements__cards');
const elementsTemplate = document.querySelector('.elements__template');

const modalImagePicture = document.querySelector('.modal__image');
const modalImageCaption = document.querySelector('.modal__caption');

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
  document.body.addEventListener('keyup', closeModalWithEsc);
};

function closeModal(modal) {
  modal.classList.remove('modal_active');
  document.body.removeEventListener('keyup', closeModalWithEsc);
};

function closeModalWithEsc(evt) {
  if (evt.key == 'Escape') {
    const modalActive = document.querySelector('.modal_active');
    closeModal(modalActive);
  };
};

function closeModalWithOverlay(evt) {
  if (evt.target.classList.contains('modal__overlay')) {
    const modalActive = evt.target.closest('.modal');
    closeModal(modalActive);
  }
}

function openModalEdit() {
  openModal(modalEdit);
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileDescription.textContent;
};

function openModalAdd() {
  openModal(modalAdd);
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
  placeInput.value = '';
  placeImageInput.value = '';
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
  const card = elementsTemplate.content.cloneNode(true).querySelector('.card');
  const cardPhoto = card.querySelector('.card__card-image');
  cardPhoto.src = elem.link;
  cardPhoto.alt = elem.name
  const cardTitle = card.querySelector('.card__card-title');
  cardTitle.textContent = elem.name;

  const cardRemove = card.querySelector('.card__remove-btn');
  cardRemove.addEventListener('click', () => removeCard(card));
  const likeButton = card.querySelector('.card__like-btn');
  likeButton.addEventListener('click', () => likeCard(likeButton));
  cardPhoto.addEventListener('click', () => openModalImage(elem));
  return card;
}

function addCard(elem) {
  const card = produceCard(elem);
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
document.body.addEventListener('click', closeModalWithOverlay);

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
