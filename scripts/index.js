import { initialCards } from './initialCards.js';
import Card from './Сard.js';
import FormValidator from './FormValidator.js'

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');

const modalList = document.querySelectorAll('.modal');
const modalEdit = document.querySelector('.modal_type_edit');
const modalAdd = document.querySelector('.modal_type_add');
const modalImage = document.querySelector('.modal_type_image');

const editFormElement = document.querySelector('.modal__form_type_edit-form');
const addFormElement = document.querySelector('.modal__form_type_add-form');

const nameInput = document.querySelector('.modal__info_type_user-name');
const jobInput = document.querySelector('.modal__info_type_user-job');

const placeInput = document.querySelector('.modal__info_type_place-name');
const placeImageInput = document.querySelector('.modal__info_type_place-image');

const profileUserName = document.querySelector('.profile__user-name');
const profileDescription = document.querySelector('.profile__description');

const elementsCards = document.querySelector('.elements__cards');

const modalImagePicture = document.querySelector('.modal__image');
const modalImageCaption = document.querySelector('.modal__caption');

const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__info',
  submitButtonSelector: '.modal__submit-btn',
  inactiveButtonClass: 'modal__submit-btn_inactive',
  inputErrorClass: 'modal__info_type_error',
  errorClass: 'modal__input-error'
};

const validateModalTypeEdit = new FormValidator(validationConfig, editFormElement);
validateModalTypeEdit.enableValidation();
const validateModalTypeAdd = new FormValidator(validationConfig, addFormElement);
validateModalTypeAdd.enableValidation();
validateModalTypeAdd.disableButtonState();

function openModal(modal) {
  modal.classList.add('modal_active');
  //modal.addEventListener('keyup', closeModalWithEsc);
};

function closeModal(modal) {
  modal.classList.remove('modal_active');
  //modal.removeEventListener('keyup', closeModalWithEsc);
};

function closeModalWithEsc(evt) {
  if (evt.key == 'Escape') {
    //const modalActive = evt.target.closest('.modal');
    const modalActive = document.querySelector('.modal_active');
    closeModal(modalActive);
  }
};

function closeModalWithOverlayAndCloseButton(evt) {
  if (evt.target.classList.contains('modal__overlay') || evt.target.classList.contains('modal__close-btn')) {
    const modalActive = evt.target.closest('.modal');
    closeModal(modalActive);
  }
};

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

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(modalEdit);
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
  closeModal(modalAdd);
  validateModalTypeAdd.disableButtonState();
};

function addCard(elem) {
  const card = new Card(elem, openModalImage, '.elements__template').generateCard();
  elementsCards.prepend(card);
};

initialCards.forEach((elem) => addCard(elem));

editButton.addEventListener('click', openModalEdit);
addButton.addEventListener('click', openModalAdd);

modalList.forEach(modal => {
  modal.addEventListener('click', closeModalWithOverlayAndCloseButton);
  modal.addEventListener('keyup', closeModalWithEsc);
});

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
